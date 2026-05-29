"use client";

import React from "react";
import { CheckCircle2, AlertOctagon, ExternalLink, Calendar, GitBranch, Shield, ArrowRight } from "lucide-react";
import { Card, CardContent, Button } from "@infrapilot/ui";
import { Deployment } from "../types";

interface ResultCardProps {
  deployment: Deployment | null;
}

export function ResultCard({ deployment }: ResultCardProps) {
  if (!deployment) return null;

  const isSuccess = deployment.status === "success";
  const isFailed = deployment.status === "failed";
  const isRollback = deployment.status === "rollback";

  if (!isSuccess && !isFailed && !isRollback) return null;

  return (
    <Card className={`border-2 ${
      isSuccess ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"
    } overflow-hidden shadow-xl`}>
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isSuccess ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
            }`}>
              {isSuccess ? <CheckCircle2 className="w-7 h-7" /> : <AlertOctagon className="w-7 h-7" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {isSuccess && "Deployment Succeeded!"}
                {isFailed && "Deployment Failed"}
                {isRollback && "Self-Healing Rollback Applied"}
              </h2>
              <p className="text-sm text-zinc-400 mt-1 max-w-md">
                {isSuccess && "Your services have been provisioned, compiled, verified and launched successfully."}
                {isFailed && "The build encountered compile or environment validation conflicts."}
                {isRollback && "Automated recovery rules executed safely to prevent production downtime."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {isSuccess && (
              <a href={deployment.repoUrl} target="_blank" rel="noreferrer">
                <Button className="gap-2">
                  Launch App
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            )}
            <a href="/dashboard">
              <Button variant="outline" className="gap-2">
                Return to Console
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>

        {/* Details Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-800/40 text-xs font-mono">
          <div>
            <span className="text-zinc-500 block mb-1">PROJECT ID</span>
            <span className="text-zinc-300 truncate block">{deployment.projectId}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">COMPLETED AT</span>
            <span className="text-zinc-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {new Date(deployment.updatedAt).toLocaleTimeString()}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">TARGET BRANCH</span>
            <span className="text-indigo-400 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5" />
              {deployment.branch}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">SECURITY STATUS</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Safe & Scanned
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ResultCard;
