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

  return (
    <Card className="max-w-2xl mx-auto overflow-hidden shadow-2xl shadow-indigo-500/5 glow-indigo border-zinc-800/80">
      <CardContent className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          <h2 className="text-xl font-bold text-white">Analyze & Deploy Repository</h2>
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
            className="w-full gap-2 mt-2"
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
        </form>
      </CardContent>
    </Card>
  );
}

export default RepoInput;
