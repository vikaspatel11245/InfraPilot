"use client";

import React from "react";
import { GitBranch, Database, ShieldAlert, Cpu, ArrowRightLeft, Radio, Network } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@infrapilot/ui";
import { Deployment } from "../types";

interface DeploymentGraphProps {
  deployment: Deployment | null;
}

export function DeploymentGraph({ deployment }: DeploymentGraphProps) {
  if (!deployment) return null;

  return (
    <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
      <CardHeader className="p-6 border-b border-zinc-800/40 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-bold text-white">Cloud Architecture Flow</CardTitle>
          <p className="text-xs text-zinc-400 mt-0.5">Topological mapping of deployed nodes</p>
        </div>
        <Network className="w-5 h-5 text-indigo-400 animate-pulse" />
      </CardHeader>

      <CardContent className="p-6">
        <div className="w-full overflow-x-auto scrollbar-thin pb-2">
          <div className="flex items-center justify-between min-w-[600px] lg:min-w-0 gap-4 py-6 relative px-4 mx-auto">
            
            {/* Node 1: Code Repository */}
            <div className="flex flex-col items-center gap-2 group z-10">
              <div className="w-14 h-14 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-200">
                <GitBranch className="w-6 h-6 text-indigo-400" />
              </div>
              <span className="text-xs font-mono font-bold text-zinc-300 font-sans">GitHub Source</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Input Repository</span>
            </div>

            <div className="hidden lg:block shrink-0 z-0">
              <ArrowRightLeft className="w-5 h-5 text-zinc-700 animate-pulse" />
            </div>

            {/* Node 2: AI Deployment Agent Orchestrator */}
            <div className="flex flex-col items-center gap-2 group z-10">
              <div className="w-16 h-16 rounded-full border border-purple-500/40 bg-purple-500/10 flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-200">
                <Cpu className="w-7 h-7 text-purple-400 animate-spin" style={{ animationDuration: "8s" }} />
              </div>
              <span className="text-xs font-mono font-bold text-white font-sans">AI Orchestrator</span>
              <span className="text-[10px] text-indigo-400 uppercase tracking-wider font-mono animate-pulse">Running Plan</span>
            </div>

            <div className="hidden lg:block shrink-0 z-0">
              <ArrowRightLeft className="w-5 h-5 text-zinc-700 animate-pulse" />
            </div>

            {/* Node 3: Target Platform Node (e.g. Vercel/Railway) */}
            <div className="flex flex-col items-center gap-2 group z-10">
              <div className="w-14 h-14 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-200">
                <Radio className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase font-sans">{deployment.recommendedInfra?.provider || "Cloud Deploy"}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Production Service</span>
            </div>

            {/* Connection back to database if required */}
            {deployment.recommendedInfra?.suggestedSpecs.database && (
              <>
                <div className="hidden lg:block shrink-0 z-0">
                  <ArrowRightLeft className="w-5 h-5 text-zinc-700" />
                </div>
                
                <div className="flex flex-col items-center gap-2 group z-10">
                  <div className="w-14 h-14 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-200">
                    <Database className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-300 font-sans">Managed DB</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">PostgreSQL</span>
                </div>
              </>
            )}

          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DeploymentGraph;
