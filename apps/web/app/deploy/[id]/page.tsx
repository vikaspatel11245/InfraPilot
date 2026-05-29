"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Sparkles, ArrowLeft, GitBranch, Shield, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button, Card, CardContent } from "@infrapilot/ui";
import { useDeployment } from "../../../features/deployment/hooks/useDeployment";
import PhaseTracker from "../../../features/deployment/components/PhaseTracker";
import LogStream from "../../../features/deployment/components/LogStream";
import InfraPanel from "../../../features/deployment/components/InfraPanel";
import FixBadges from "../../../features/deployment/components/FixBadges";
import ResultCard from "../../../features/deployment/components/ResultCard";
import ErrorBanner from "../../../features/deployment/components/ErrorBanner";
import DeploymentTimeline from "../../../features/deployment/components/DeploymentTimeline";
import DeploymentGraph from "../../../features/deployment/components/DeploymentGraph";
import DeploymentStatusIndicator from "../../../features/deployment/components/DeploymentStatus";

export default function DeploymentDetail() {
  const { id } = useParams() as { id: string };
  const { activeDeployment, isConnected } = useDeployment(id);

  if (!activeDeployment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center font-mono">
        <LoaderSpinner />
        <span className="text-sm text-zinc-500 mt-4">Connecting to deployment orchestrator...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn duration-200">
      
      {/* Navigation & Header status row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/40 pb-6">
        <div className="space-y-1.5">
          <Link href="/dashboard" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mb-2 group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Console
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-white max-w-[300px] truncate">
              {activeDeployment.repoUrl.replace("https://github.com/", "")}
            </h1>
            <DeploymentStatusIndicator status={activeDeployment.status} />
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <GitBranch className="w-3.5 h-3.5 text-zinc-500" />
              {activeDeployment.branch}
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-zinc-500" />
              ID: {activeDeployment.id.slice(0, 8)}
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-emerald-400" : "bg-red-400 animate-pulse"}`} />
              {isConnected ? "Live Socket Sync" : "Sync Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* Error alert Banner */}
      <ErrorBanner deployment={activeDeployment} />

      {/* Main Success/Failure Result Card */}
      <ResultCard deployment={activeDeployment} />

      {/* Core Phase Progression and Visual flow graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2/3 - Live tracking steps & interactive console */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Visual stage checklist bar */}
          <Card className="p-6 border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
            <PhaseTracker deployment={activeDeployment} />
          </Card>

          {/* Interactive virtualized terminal stream */}
          <LogStream logs={activeDeployment.agentThoughts.map(t => ({
            timestamp: t.timestamp,
            source: t.data?.source || (t.type === "act" ? "stdout" : "agent"),
            message: t.thought
          }))} />

        </div>

        {/* Right 1/3 - Infrastructure Panel and fixesApplied */}
        <div className="space-y-8">
          
          {/* Cloud Infra specs recommended */}
          <InfraPanel infra={activeDeployment.recommendedInfra} />

          {/* Self-healing patch badges */}
          <FixBadges fixes={activeDeployment.appliedFixes} />

        </div>
      </div>

      {/* Architectural Graph & Timeline section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DeploymentGraph deployment={activeDeployment} />
        <DeploymentTimeline deployment={activeDeployment} />
      </div>

    </div>
  );
}

function LoaderSpinner() {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full border-2 border-indigo-500/10" />
      <div className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
    </div>
  );
}
