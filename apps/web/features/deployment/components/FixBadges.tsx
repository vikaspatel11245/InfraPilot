"use client";

import React from "react";
import { Hammer, CheckCircle2, AlertCircle, History, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@infrapilot/ui";
import { DeploymentFix } from "../types";

interface FixBadgesProps {
  fixes: DeploymentFix[];
}

export function FixBadges({ fixes }: FixBadgesProps) {
  if (fixes.length === 0) {
    return (
      <Card className="border-zinc-800 bg-zinc-950/20 p-6 flex items-center justify-center gap-3">
        <Sparkles className="w-4 h-4 text-zinc-600" />
        <span className="text-xs text-zinc-500 font-mono">No failures detected. Healing engine idle.</span>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
      <CardHeader className="p-6 border-b border-zinc-800/40 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Hammer className="w-4.5 h-4.5" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-white">Self-Healing Patcher Logs</CardTitle>
            <p className="text-xs text-zinc-400 mt-0.5">Automated code & config corrections</p>
          </div>
        </div>
        <Badge variant="success" className="font-mono text-xs">
          {fixes.length} Applied
        </Badge>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {fixes.map((fix) => (
            <div
              key={fix.id}
              className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/40 transition-colors duration-150 flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white truncate">{fix.title}</span>
                  <Badge variant={fix.status === "applied" ? "success" : "error"} className="text-[10px] font-mono py-0.5">
                    {fix.status}
                  </Badge>
                </div>
                <div className="text-xs space-y-1 font-mono">
                  <p className="text-red-400 truncate">
                    <span className="text-zinc-600">ERROR:</span> {fix.errorMatched}
                  </p>
                  <p className="text-emerald-400 leading-relaxed break-all">
                    <span className="text-zinc-600">PATCH:</span> {fix.fixApplied}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between h-full shrink-0">
                {fix.status === "applied" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.2)]" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
                <span className="text-[10px] text-zinc-600 font-mono flex items-center gap-1 mt-6">
                  <History className="w-3 h-3" />
                  {new Date(fix.appliedAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default FixBadges;
