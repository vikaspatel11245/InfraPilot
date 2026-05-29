"use client";

import React from "react";
import { Circle, Sparkles, Activity, AlertCircle, HelpCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@infrapilot/ui";
import { Deployment } from "../types";

interface DeploymentTimelineProps {
  deployment: Deployment | null;
}

export function DeploymentTimeline({ deployment }: DeploymentTimelineProps) {
  if (!deployment) return null;

  const thoughts = deployment.agentThoughts || [];

  return (
    <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
      <CardHeader className="p-6 border-b border-zinc-800/40">
        <CardTitle className="text-base font-bold text-white">Agent Thinking Timeline</CardTitle>
        <p className="text-xs text-zinc-400 mt-0.5">Live cognitive stream from the AI planner</p>
      </CardHeader>

      <CardContent className="p-6">
        {thoughts.length === 0 ? (
          <div className="text-center py-8 text-xs text-zinc-500 font-mono">
            Orchestrating agent workflows...
          </div>
        ) : (
          <div className="relative border-l border-zinc-800/80 ml-3.5 pl-6 space-y-6">
            {thoughts.map((thought, index) => {
              const dateStr = new Date(thought.timestamp).toLocaleTimeString();
              
              let icon = <Circle className="w-3.5 h-3.5" />;
              let color = "text-zinc-500 border-zinc-800 bg-zinc-900";

              switch (thought.type) {
                case "observe":
                  icon = <Activity className="w-3 h-3" />;
                  color = "text-blue-400 border-blue-500/30 bg-blue-500/10";
                  break;
                case "analyze":
                  icon = <HelpCircle className="w-3 h-3" />;
                  color = "text-purple-400 border-purple-500/30 bg-purple-500/10";
                  break;
                case "plan":
                  icon = <Sparkles className="w-3.5 h-3.5" />;
                  color = "text-amber-400 border-amber-500/30 bg-amber-500/10";
                  break;
                case "act":
                  icon = <Sparkles className="w-3 h-3" />;
                  color = "text-indigo-400 border-indigo-500/30 bg-indigo-500/10";
                  break;
                case "reflect":
                  icon = <AlertCircle className="w-3 h-3" />;
                  color = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
                  break;
              }

              return (
                <div key={index} className="relative group">
                  {/* Timeline Node dot */}
                  <div className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${color}`}>
                    {icon}
                  </div>

                  {/* Thought content */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                        {thought.type}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">{dateStr}</span>
                    </div>
                    <p className="text-sm text-zinc-300 font-light leading-relaxed">
                      {thought.thought}
                    </p>
                    {thought.data && (
                      <pre className="mt-2 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/40 text-[10px] text-zinc-400 overflow-x-auto font-mono max-h-40">
                        {JSON.stringify(thought.data, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default DeploymentTimeline;
