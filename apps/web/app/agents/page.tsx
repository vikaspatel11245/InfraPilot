"use client";

import React from "react";
import { Bot, Sparkles, Brain, Cpu, MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@infrapilot/ui";

export default function Agents() {
  const thoughtLogs = [
    { time: "11:15 AM", type: "analyze", msg: "Scanning target repository directory matching express configurations." },
    { time: "11:16 AM", type: "plan", msg: "Identified Dockerfile missing environment placeholders. Initiating patcher rules." },
    { time: "11:17 AM", type: "act", msg: "Applied file patch to Dockerfile and verified compiled container size." }
  ];

  return (
    <div className="space-y-8 animate-fadeIn duration-200 font-mono">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 font-sans">
          AI Agent Operations
          <Bot className="w-6.5 h-6.5 text-indigo-400" />
        </h1>
        <p className="text-sm text-zinc-400 font-light mt-1 font-sans">
          Track agentic cognitive planning loops, self-healing tasks and diagnostics in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Memory Stats */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Memory Context</span>
              <p className="text-2xl font-bold text-white font-mono">4,096 tokens</p>
            </div>
            <Brain className="w-8 h-8 text-indigo-400" />
          </CardContent>
        </Card>

        {/* Model info */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Active Model</span>
              <p className="text-2xl font-bold text-white font-mono">Gemini Pro</p>
            </div>
            <Cpu className="w-8 h-8 text-purple-400" />
          </CardContent>
        </Card>

        {/* Total calls */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Agent Requests</span>
              <p className="text-2xl font-bold text-white font-mono">148 executions</p>
            </div>
            <MessageSquare className="w-8 h-8 text-emerald-400" />
          </CardContent>
        </Card>

      </div>

      {/* Thoughts list */}
      <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
        <CardHeader className="p-6 border-b border-zinc-900/40">
          <CardTitle className="text-base font-bold text-white font-sans flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            Agent Cognitive Telemetry Stream
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {thoughtLogs.map((log, index) => (
              <div key={index} className="flex gap-4 p-3 bg-zinc-900/40 rounded-lg border border-zinc-850 hover:bg-zinc-900/70 transition-colors duration-150 text-xs">
                <span className="text-zinc-500 shrink-0 select-none">{log.time}</span>
                <span className="text-indigo-400 uppercase tracking-wider font-bold shrink-0">[{log.type}]</span>
                <span className="text-zinc-300 font-light flex-1 leading-relaxed">{log.msg}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
