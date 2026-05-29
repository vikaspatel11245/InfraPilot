"use client";

import React, { useState, useEffect } from "react";
import { GitBranch, GitFork, AlertCircle, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Button, Card, CardContent, Input } from "@infrapilot/ui";
import githubService from "../services/github.service";

interface RepoInputProps {
  onDeploy: (repoUrl: string, branch: string) => void;
  isDeploying?: boolean;
}

export function RepoInput({ onDeploy, isDeploying = false }: RepoInputProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [branches, setBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("main");

  // Multi-user dynamic Vercel / Render connections
  const [vercelConnected, setVercelConnected] = useState(false);
  const [renderConnected, setRenderConnected] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [vercelToken, setVercelToken] = useState("");
  const [renderToken, setRenderToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const vToken = localStorage.getItem("infrapilot_vercel_token") || "";
      const rToken = localStorage.getItem("infrapilot_render_token") || "";
      setVercelConnected(!!vToken);
      setRenderConnected(!!rToken);
      setVercelToken(vToken);
      setRenderToken(rToken);
    }
  }, []);

  useEffect(() => {
    if (!repoUrl) {
      setIsValid(null);
      setBranches([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsValidating(true);
      const valid = await githubService.validateRepo(repoUrl);
      setIsValid(valid);
      if (valid) {
        const branchList = await githubService.getBranches(repoUrl);
        setBranches(branchList);
        setSelectedBranch(branchList[0] || "main");
      } else {
        setBranches([]);
      }
      setIsValidating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [repoUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && repoUrl) {
      onDeploy(repoUrl, selectedBranch);
    }
  };

  const handleConnect = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("infrapilot_vercel_token", vercelToken);
      localStorage.setItem("infrapilot_render_token", renderToken);
      setVercelConnected(!!vercelToken);
      setRenderConnected(!!renderToken);
      setShowConnectModal(false);
    }
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto overflow-hidden shadow-2xl shadow-indigo-500/5 glow-indigo border-zinc-800/80">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              <h2 className="text-xl font-bold text-white">Analyze & Deploy Repository</h2>
            </div>
            
            {/* Direct Connect Action Header */}
            <button
              type="button"
              onClick={() => setShowConnectModal(true)}
              className="text-xs font-semibold font-mono px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${vercelConnected || renderConnected ? "bg-emerald-400" : "bg-indigo-400"}`} />
              Connect Cloud Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label className="text-xs font-mono text-zinc-400 block mb-2">GIT REPOSITORY URL</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="https://github.com/username/project"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  disabled={isDeploying}
                  className="pl-4 pr-10 font-mono"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  {isValidating && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
                  {!isValidating && isValid === true && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {!isValidating && isValid === false && <AlertCircle className="w-4 h-4 text-red-400" />}
                </div>
              </div>
              {isValid === false && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Unable to reach this repository. Ensure it is public.
                </p>
              )}
            </div>

            {isValid && branches.length > 0 && (
              <div className="animate-fadeIn duration-200">
                <label className="text-xs font-mono text-zinc-400 block mb-2">SELECT BRANCH</label>
                <div className="relative">
                  <GitBranch className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    disabled={isDeploying}
                    className="w-full h-10 rounded-lg border border-zinc-800 bg-zinc-950/60 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700/80 focus:ring-1 focus:ring-zinc-700/80 transition-all appearance-none cursor-pointer"
                  >
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <GitFork className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={!isValid || isDeploying || isValidating}
              className="w-full gap-2 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg h-11 text-sm font-semibold"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deploying Stack...
                </>
              ) : (
                <>
                  <GitFork className="w-4 h-4" />
                  Trigger Autonomous Deployment
                </>
              )}
            </Button>

            {/* Cloud Connection Warnings / Success Indicators */}
            {!vercelConnected && !renderConnected ? (
              <div className="p-3.5 rounded-lg bg-indigo-500/5 border border-indigo-500/15 flex items-center justify-between text-xs font-mono mt-2">
                <span className="text-zinc-400 font-light flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 animate-pulse" />
                  Running in <strong>Simulation Sandbox Mode</strong> (billing offline).
                </span>
                <button
                  type="button"
                  onClick={() => setShowConnectModal(true)}
                  className="px-2.5 py-1.5 rounded-md bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-400 transition-all font-semibold cursor-pointer select-none"
                >
                  Connect Vercel/Render
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-between text-xs font-mono mt-2">
                <span className="text-emerald-400/90 font-light flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Cloud active: {vercelConnected && "Vercel"} {vercelConnected && renderConnected && "&"} {renderConnected && "Render"} (Production online).
                </span>
                <button
                  type="button"
                  onClick={() => setShowConnectModal(true)}
                  className="text-zinc-500 hover:text-zinc-400 transition-colors font-semibold underline underline-offset-2 cursor-pointer select-none"
                >
                  Configure
                </button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Connect Credentials Modal Overlay */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl relative space-y-6">
            <button 
              onClick={() => setShowConnectModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors text-sm hover:scale-110"
            >
              ✕
            </button>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-indigo-400 animate-pulse" />
                Connect Cloud Accounts
              </h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Provide your personal API credentials below to authorize the agent to deploy directly to your Vercel and Render accounts.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 block mb-1">VERCEL DEPLOYMENT TOKEN</label>
                <input
                  type="password"
                  placeholder="sec_..."
                  value={vercelToken}
                  onChange={(e) => setVercelToken(e.target.value)}
                  className="w-full h-10 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 text-xs text-white placeholder-zinc-700 font-mono focus:outline-none focus:border-zinc-700 transition-all"
                />
                <a 
                  href="https://vercel.com/account/tokens" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[9px] font-mono text-indigo-400 hover:underline block pt-1"
                >
                  → Generate a Vercel Token in settings
                </a>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 block mb-1">RENDER API KEY</label>
                <input
                  type="password"
                  placeholder="Enter Render Account API key"
                  value={renderToken}
                  onChange={(e) => setRenderToken(e.target.value)}
                  className="w-full h-10 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 text-xs text-white placeholder-zinc-700 font-mono focus:outline-none focus:border-zinc-700 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button 
                onClick={handleConnect}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all text-xs font-semibold h-10"
              >
                Connect & Activate Accounts
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setShowConnectModal(false)}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-400 text-xs font-semibold h-10 px-4"
              >
                Cancel
              </Button>
            </div>
            
            <p className="text-[10px] text-zinc-500 font-mono leading-relaxed text-center">
              🔒 Credentials are encrypted inside your browser LocalStorage and never persist on our servers.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default RepoInput;
