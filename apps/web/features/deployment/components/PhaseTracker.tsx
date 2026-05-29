"use client";

import React from "react";
import { Check, Loader2, AlertCircle, Circle } from "lucide-react";
import { cn } from "@infrapilot/ui";
import { Deployment } from "../types";
import { usePhase } from "../hooks/usePhase";

interface PhaseTrackerProps {
  deployment: Deployment | null;
}

export function PhaseTracker({ deployment }: PhaseTrackerProps) {
  const { phasesList, activePhase, progressPercent } = usePhase(deployment);

  if (!deployment) return null;

  return (
    <div className="space-y-6">
      {/* Progress metrics header */}
      <div className="flex items-center justify-between border-b border-zinc-800/40 pb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Deployment Progress</h3>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            {activePhase ? `Executing: ${activePhase.description}` : "Idle"}
          </p>
        </div>
        <span className="text-2xl font-bold tracking-tight text-indigo-400 font-mono">
          {progressPercent}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step nodes list */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {phasesList.map((phase) => {
          const isPending = phase.status === "pending";
          const isRunning = phase.status === "running";
          const isSuccess = phase.status === "success";
          const isFailed = phase.status === "failed";

          return (
            <div
              key={phase.name}
              className={cn(
                "p-4 rounded-xl border flex flex-col justify-between transition-all duration-200",
                {
                  "border-zinc-800 bg-zinc-950/20 text-zinc-500": isPending,
                  "border-indigo-500/40 bg-indigo-500/5 text-indigo-200 shadow-md shadow-indigo-500/5":
                    isRunning,
                  "border-emerald-500/30 bg-emerald-500/5 text-emerald-400": isSuccess,
                  "border-red-500/30 bg-red-500/5 text-red-400": isFailed,
                }
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {phase.name}
                </span>

                {/* State Icons */}
                {isSuccess && <Check className="w-4 h-4 text-emerald-400" />}
                {isRunning && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
                {isFailed && <AlertCircle className="w-4 h-4 text-red-400" />}
                {isPending && <Circle className="w-3.5 h-3.5 text-zinc-700" />}
              </div>

              <span className="text-sm font-semibold truncate text-white">
                {phase.name.charAt(0).toUpperCase() + phase.name.slice(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PhaseTracker;
