"use client";

import React from "react";
import { Sparkles, DollarSign, Target, Award, Cpu, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@infrapilot/ui";
import { RecommendedInfra } from "../types";

interface InfraPanelProps {
  infra?: RecommendedInfra;
}

export function InfraPanel({ infra }: InfraPanelProps) {
  if (!infra) {
    return (
      <Card className="border-dashed border-zinc-800 bg-transparent flex flex-col items-center justify-center p-8 text-center">
        <Sparkles className="w-8 h-8 text-zinc-600 animate-pulse mb-3" />
        <h3 className="text-sm font-semibold text-zinc-400">Analyzing Repository Architecture</h3>
        <p className="text-xs text-zinc-500 max-w-xs mt-1 leading-relaxed">
          Our AI engineer is inspecting your package configurations and framework patterns to recommend optimal target cloud instances.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-950/40 backdrop-blur-md glow-indigo">
      <CardHeader className="border-b border-zinc-800/40 p-6 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-white">Recommended Architecture</CardTitle>
            <p className="text-xs text-zinc-400 mt-0.5">AI-driven multi-cloud matching results</p>
          </div>
        </div>
        <Badge variant="success" className="uppercase font-mono text-[10px] tracking-wider py-1 px-2.5">
          {infra.provider} MATCHED
        </Badge>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Core Stats */}
        <div className="grid grid-cols-3 gap-4 border-b border-zinc-800/40 pb-5">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 block mb-1">PROVIDER</span>
            <span className="text-sm font-bold text-white uppercase tracking-wide">{infra.provider}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-500 block mb-1">ESTIMATED COST</span>
            <span className="text-sm font-bold text-indigo-400 flex items-center gap-0.5 font-mono">
              <DollarSign className="w-3.5 h-3.5" />
              {infra.estimatedCost}/mo
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-500 block mb-1">CONFIDENCE</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1 font-mono">
              <Target className="w-3.5 h-3.5" />
              {infra.confidence * 100}%
            </span>
          </div>
        </div>

        {/* Suggested Specs */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-300 mb-3 flex items-center gap-1.5 font-mono">
            <Cpu className="w-3.5 h-3.5 text-zinc-500" />
            TARGET SPECIFICATIONS
          </h4>
          <div className="bg-zinc-900/60 rounded-xl border border-zinc-800/60 p-4 space-y-2 font-mono text-xs text-zinc-300">
            {infra.suggestedSpecs.cpu && (
              <div className="flex justify-between">
                <span className="text-zinc-500">Virtual CPU Core:</span>
                <span className="text-zinc-200">{infra.suggestedSpecs.cpu}</span>
              </div>
            )}
            {infra.suggestedSpecs.memory && (
              <div className="flex justify-between">
                <span className="text-zinc-500">Node Memory:</span>
                <span className="text-zinc-200">{infra.suggestedSpecs.memory}</span>
              </div>
            )}
            {infra.suggestedSpecs.database && (
              <div className="flex justify-between">
                <span className="text-zinc-500">Database Engine:</span>
                <span className="text-indigo-300">{infra.suggestedSpecs.database}</span>
              </div>
            )}
          </div>
        </div>

        {/* Reasoning */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-300 mb-3 flex items-center gap-1.5 font-mono">
            <Award className="w-3.5 h-3.5 text-zinc-500" />
            AI SELECTION REASONING
          </h4>
          <ul className="space-y-2">
            {infra.reasoning.map((reason, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed font-light">
                <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default InfraPanel;
