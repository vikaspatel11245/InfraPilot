"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { 
  Plus, 
  Layers, 
  Timer, 
  Heart, 
  GitBranch, 
  Terminal, 
  Server,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@infrapilot/ui";
import { useDeployment } from "../../features/deployment/hooks/useDeployment";
import DeploymentStatusIndicator from "../../features/deployment/components/DeploymentStatus";

export default function Dashboard() {
  const { deployments, loadAllDeployments } = useDeployment();

  useEffect(() => {
    loadAllDeployments();
  }, [loadAllDeployments]);

  const activeCount = deployments.filter(d => ["queued", "analyzing", "planning", "deploying", "verifying"].includes(d.status)).length;
  const successCount = deployments.filter(d => d.status === "success").length;
  const failedCount = deployments.filter(d => d.status === "failed").length;

  return (
    <div className="space-y-8 animate-fadeIn duration-200">
      
      {/* Top dashboard greeting header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Control Console
            <Sparkles className="w-5.5 h-5.5 text-indigo-400 animate-pulse" />
          </h1>
          <p className="text-sm text-zinc-400 font-light mt-1">
            Oversee autonomous deployments, compute structures, and AI self-healing actions.
          </p>
        </div>

        <Link href="/deploy">
          <Button className="gap-2 font-semibold">
            <Plus className="w-4 h-4" />
            New Deployment
          </Button>
        </Link>
      </div>

      {/* Metrics Row Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Active deployments */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">ACTIVE AGENTS</span>
              <p className="text-3xl font-bold tracking-tight text-indigo-400 font-mono">{activeCount}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Server className="w-6 h-6 animate-pulse" />
            </div>
          </CardContent>
        </Card>

        {/* Total success */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">SUCCESSFUL BUILDS</span>
              <p className="text-3xl font-bold tracking-tight text-emerald-400 font-mono">{successCount}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Deployment speeds */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">AVG DEPLOY TIME</span>
              <p className="text-3xl font-bold tracking-tight text-white font-mono">1m 45s</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-zinc-900 text-zinc-400 flex items-center justify-center border border-zinc-800">
              <Timer className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">HEALING ENGINE HEALTH</span>
              <p className="text-3xl font-bold tracking-tight text-emerald-400 font-mono">100%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Heart className="w-6 h-6 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Grid section split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2/3 column - Recent Deployments Table */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-4.5 h-4.5 text-zinc-500" />
            Recent Deployment Operations
          </h3>

          <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="bg-zinc-900/60 text-xs font-mono text-zinc-500 uppercase border-b border-zinc-800/80">
                  <tr>
                    <th className="px-6 py-4">Repository</th>
                    <th className="px-6 py-4">Branch</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Executed At</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850">
                  {deployments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-zinc-500 font-mono text-xs">
                        No deployment pipelines initiated yet. Use "New Deployment" to scaffold your repository.
                      </td>
                    </tr>
                  ) : (
                    deployments.map((d) => (
                      <tr key={d.id} className="hover:bg-zinc-900/20 transition-all duration-100">
                        <td className="px-6 py-4.5 font-semibold text-white max-w-[200px] truncate">
                          {d.repoUrl.replace("https://github.com/", "")}
                        </td>
                        <td className="px-6 py-4.5 font-mono text-zinc-400 flex items-center gap-1">
                          <GitBranch className="w-3.5 h-3.5 text-zinc-500" />
                          {d.branch}
                        </td>
                        <td className="px-6 py-4.5">
                          <DeploymentStatusIndicator status={d.status} />
                        </td>
                        <td className="px-6 py-4.5 font-mono text-xs text-zinc-500">
                          {new Date(d.createdAt).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4.5 text-right">
                          <Link href={`/deploy/${d.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 gap-1 font-semibold text-xs text-indigo-400 hover:text-white">
                              Inspect
                              <ArrowRight className="w-3 h-3" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right 1/3 column - Live agent actions/Thoughts logs */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-4.5 h-4.5 text-zinc-500" />
            AI Engineer Activity
          </h3>

          <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md p-6 h-[400px] overflow-y-auto space-y-4">
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-zinc-400">Agent Status: Awaiting triggers</span>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/80 text-xs leading-relaxed space-y-1 font-mono">
                <span className="text-zinc-500">11:15:32 AM - Planner</span>
                <p className="text-zinc-300">Scaffolded root system framework successfully.</p>
              </div>

              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/80 text-xs leading-relaxed space-y-1 font-mono">
                <span className="text-zinc-500">11:15:40 AM - Analyzer</span>
                <p className="text-zinc-300">Verified TypeScript packages workspace configuration.</p>
              </div>

              <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800/80 text-xs leading-relaxed space-y-1 font-mono">
                <span className="text-zinc-500">11:15:45 AM - Patcher</span>
                <p className="text-zinc-300">Initiated Tailwind engine presets and styles.</p>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
