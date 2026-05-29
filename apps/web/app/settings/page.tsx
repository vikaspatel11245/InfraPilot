"use client";

import React, { useState } from "react";
import { Settings, Key, Shield, Check, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from "@infrapilot/ui";

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState("••••••••••••••••••••");
  const [gitToken, setGitToken] = useState("••••••••••••••••••••");

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">System Settings</h1>
          <p className="text-sm text-zinc-400 font-light mt-0.5">Manage LLM parameters, Git OAuth integration, and cloud target credentials.</p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Credentials Card */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardHeader className="p-6 border-b border-zinc-900/40 flex justify-between items-center space-y-0">
            <div className="flex items-center gap-2">
              <Key className="w-4.5 h-4.5 text-indigo-400" />
              <CardTitle className="text-sm font-bold text-zinc-200">Secrets & Credentials</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-500 block mb-1">GEMINI AI API KEY</label>
              <Input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-500 block mb-1">GITHUB PERSONAL ACCESS TOKEN (PAT)</label>
              <Input
                type="password"
                value={gitToken}
                onChange={(e) => setGitToken(e.target.value)}
                className="font-mono text-xs"
              />
            </div>

            <Button className="h-10 text-xs font-semibold px-4 mt-2">
              Save Credentials
            </Button>
          </CardContent>
        </Card>

        {/* Deploy Settings */}
        <Card className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md">
          <CardHeader className="p-6 border-b border-zinc-900/40">
            <div className="flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-emerald-400" />
              <CardTitle className="text-sm font-bold text-zinc-200">Security & Isolation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-xs leading-relaxed text-zinc-400 font-light">
            <p>
              By default, all sandbox containers run with read-only root filesystems and are limited to 1GB RAM and 0.5 vCPU threads.
            </p>
            <p>
              Self-healing patch iterations are capped at a maximum of 3 patches per single pipeline before raising human-intervention alarms.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
