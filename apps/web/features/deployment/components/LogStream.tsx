"use client";

import React, { useEffect, useRef, useState } from "react";
import { Terminal, Check, Copy, SlidersHorizontal } from "lucide-react";
import { Card, CardHeader, CardTitle, Button } from "@infrapilot/ui";
import { LogLine, DeploymentPhase } from "../types";
import { parseAnsiLogs } from "../utils/logParser";

interface LogStreamProps {
  logs: LogLine[];
}

export function LogStream({ logs }: LogStreamProps) {
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [copied, setCopied] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "stdout" | "stderr" | "agent">("all");

  const filteredLogs = logs.filter((log) => {
    if (filterType === "all") return true;
    return log.source === filterType;
  });

  useEffect(() => {
    if (autoScroll && terminalContainerRef.current) {
      const container = terminalContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [filteredLogs, autoScroll]);

  const copyToClipboard = () => {
    const rawLogs = filteredLogs.map((l) => `[${l.timestamp}] [${l.source}] ${l.message}`).join("\n");
    navigator.clipboard.writeText(rawLogs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const threshold = 20; // px buffer
    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight <= threshold;
    
    if (isAtBottom && !autoScroll) {
      setAutoScroll(true);
    } else if (!isAtBottom && autoScroll) {
      setAutoScroll(false);
    }
  };

  return (
    <Card className="border-zinc-800 bg-zinc-950 font-mono shadow-inner rounded-xl overflow-hidden">
      {/* Shell Header */}
      <CardHeader className="bg-zinc-900/60 px-6 py-3 border-b border-zinc-800/80 flex flex-row items-center justify-between space-y-0 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <CardTitle className="text-sm font-semibold font-mono text-zinc-300">Live Console Shell</CardTitle>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Filter Select */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-zinc-800 text-xs border border-zinc-700 text-zinc-300 rounded px-2.5 py-1 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-zinc-600 pr-6 font-mono"
            >
              <option value="all">All Sources</option>
              <option value="stdout">stdout</option>
              <option value="stderr">stderr</option>
              <option value="agent">Agent Thoughts</option>
            </select>
            <SlidersHorizontal className="w-3 h-3 text-zinc-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Copy Button */}
          <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-7 w-7 p-0 rounded bg-zinc-800 hover:bg-zinc-700">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
          </Button>

          {/* Auto scroll lock */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAutoScroll(!autoScroll)}
            className={`h-7 px-2.5 text-xs rounded font-mono ${
              autoScroll ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            AutoScroll
          </Button>
        </div>
      </CardHeader>

      {/* Terminal Viewport */}
      <div 
        ref={terminalContainerRef}
        onScroll={handleScroll}
        className="p-6 h-[400px] overflow-y-auto font-mono text-xs leading-relaxed space-y-2 select-text selection:bg-indigo-500/35 selection:text-white"
      >
        {filteredLogs.length === 0 ? (
          <div className="text-zinc-600 italic h-full flex items-center justify-center">
            Waiting for deployment logs stream...
          </div>
        ) : (
          filteredLogs.map((log, index) => {
            const dateStr = new Date(log.timestamp).toLocaleTimeString();
            
            let sourceColor = "text-zinc-500";
            if (log.source === "stderr") sourceColor = "text-red-400";
            if (log.source === "system") sourceColor = "text-amber-500";
            if (log.source === "agent") sourceColor = "text-indigo-400 font-semibold";

            return (
              <div key={index} className="flex items-start gap-3 hover:bg-zinc-900/30 px-1 py-0.5 rounded transition-colors duration-100">
                <span className="text-zinc-600 shrink-0 select-none">{dateStr}</span>
                <span className={`shrink-0 select-none uppercase text-[10px] tracking-wider px-1 bg-zinc-900 border border-zinc-800 rounded ${sourceColor}`}>
                  {log.source}
                </span>
                <span 
                  className="text-zinc-300 break-all whitespace-pre-wrap flex-1"
                  dangerouslySetInnerHTML={{ __html: parseAnsiLogs(log.message) }}
                />
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

export default LogStream;
