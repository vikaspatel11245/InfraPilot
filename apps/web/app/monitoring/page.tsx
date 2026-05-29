"use client";

import React from "react";
import { Activity, ShieldAlert, Cpu, Database, Server, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@infrapilot/ui";

export default function Monitoring() {
  return (
    <div className="space-y-8 animate-fadeIn duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Live Metrics & Observability
            <Activity className="w-5.5 h-5.5 text-indigo-400 animate-pulse" />
          </h1>
          <p className="text-sm text-zinc-400 font-light mt-1">
            Observe real-time virtual cpu allocations, container thread memory, network bandwidth, and logs.
          </p>
        </div>

        <Button variant="outline" className="gap-2 font-mono text-xs h-9">
          <RefreshCw className="w-3.5 h-3.5" />
          REFRESH METRICS
        </Button>
      </div>

      {/* Main metrics charts row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Cpu usage */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardHeader className="p-6 border-b border-zinc-900/40 flex justify-between items-center flex-row space-y-0">
            <CardTitle className="text-sm font-semibold font-mono text-zinc-300">Virtual CPU Usage</CardTitle>
            <Cpu className="w-4.5 h-4.5 text-indigo-400" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-28 flex items-end justify-between gap-1.5 pt-6">
              {[25, 45, 60, 30, 20, 75, 40, 15, 30, 48].map((v, i) => (
                <div key={i} className="flex-1 bg-zinc-900 rounded relative group" style={{ height: `${v}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/40 to-blue-500/80 rounded group-hover:opacity-100 transition-opacity duration-150" />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-zinc-600 font-mono mt-4">
              <span>10m ago</span>
              <span>Active: 48%</span>
              <span>Now</span>
            </div>
          </CardContent>
        </Card>

        {/* Memory usage */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardHeader className="p-6 border-b border-zinc-900/40 flex justify-between items-center flex-row space-y-0">
            <CardTitle className="text-sm font-semibold font-mono text-zinc-300">Container RAM Allocations</CardTitle>
            <Server className="w-4.5 h-4.5 text-blue-400" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-28 flex items-end justify-between gap-1.5 pt-6">
              {[60, 62, 59, 64, 65, 60, 66, 68, 67, 70].map((v, i) => (
                <div key={i} className="flex-1 bg-zinc-900 rounded relative group" style={{ height: `${v}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-cyan-500/80 rounded group-hover:opacity-100 transition-opacity duration-150" />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-zinc-600 font-mono mt-4">
              <span>10m ago</span>
              <span>Allocated: 70%</span>
              <span>Now</span>
            </div>
          </CardContent>
        </Card>

        {/* Network thread bandwidth */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardHeader className="p-6 border-b border-zinc-900/40 flex justify-between items-center flex-row space-y-0">
            <CardTitle className="text-sm font-semibold font-mono text-zinc-300">Network Bandwidth</CardTitle>
            <Activity className="w-4.5 h-4.5 text-emerald-400" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-28 flex items-end justify-between gap-1.5 pt-6">
              {[12, 18, 45, 80, 15, 22, 60, 75, 40, 32].map((v, i) => (
                <div key={i} className="flex-1 bg-zinc-900 rounded relative group" style={{ height: `${v}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/40 to-teal-500/80 rounded group-hover:opacity-100 transition-opacity duration-150" />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-zinc-600 font-mono mt-4">
              <span>10m ago</span>
              <span>Bandwidth: 32MB/s</span>
              <span>Now</span>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
