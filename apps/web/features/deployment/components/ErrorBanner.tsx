"use client";

import React from "react";
import { AlertTriangle, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent, Button } from "@infrapilot/ui";
import { Deployment } from "../types";

interface ErrorBannerProps {
  deployment: Deployment | null;
  onRetry?: () => void;
}

export function ErrorBanner({ deployment, onRetry }: ErrorBannerProps) {
  if (!deployment || deployment.status !== "failed") return null;

  return (
    <Card className="border-red-500/20 bg-red-500/5 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Deployment Interrupted</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
                Our autonomous engine is currently diagnosing the build logs. We have matched this issue against common package-manager conflicts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            <div className="flex items-center gap-2 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-lg font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              AI: Patcher Auto-Engaging
            </div>

            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry} className="h-9 gap-1.5 font-mono text-xs">
                <RefreshCw className="w-3.5 h-3.5" />
                Force Run
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ErrorBanner;
