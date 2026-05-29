"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Terminal, Shield } from "lucide-react";
import { RepoInput } from "../../features/deployment/components/RepoInput";
import { deploymentService } from "../../features/deployment/services/deployment.service";

export default function Deploy() {
  const router = useRouter();
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = async (repoUrl: string, branch: string) => {
    setIsDeploying(true);
    const id = await deploymentService.startDeployment(repoUrl, branch);
    if (id) {
      router.push(`/deploy/${id}`);
    } else {
      setIsDeploying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn duration-200">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
          Autonomous Deployment Pipeline
        </h1>
        <p className="text-zinc-400 font-light max-w-lg mx-auto text-sm leading-relaxed">
          Provide a public GitHub url and let the autonomous AI analyze, provision infra, compile code and self-heal deployment bugs.
        </p>
      </div>

      {/* Main input card */}
      <RepoInput onDeploy={handleDeploy} isDeploying={isDeploying} />

      {/* Guide details below */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="p-5 border border-zinc-800 bg-zinc-950/20 rounded-xl flex gap-3">
          <Terminal className="w-5.5 h-5.5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white">Advanced Code Inspection</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Our analyzer inspects package.json files, workspaces configurations, database requirements, environments and build parameters.
            </p>
          </div>
        </div>

        <div className="p-5 border border-zinc-800 bg-zinc-950/20 rounded-xl flex gap-3">
          <Shield className="w-5.5 h-5.5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white">Sandbox Isolation</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              All build checks run in secure sandboxed docker engines preventing injection vulnerability or compiler thread blocks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
