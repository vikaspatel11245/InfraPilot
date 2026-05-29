"use client";

import React, { useState, useEffect } from "react";
import { Settings, Key, Shield, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from "@infrapilot/ui";

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState("");
  const [gitToken, setGitToken] = useState("");
  const [vercelToken, setVercelToken] = useState("");
  const [railwayToken, setRailwayToken] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGeminiKey(localStorage.getItem("infrapilot_gemini_key") || "");
      setGitToken(localStorage.getItem("infrapilot_github_token") || "");
      setVercelToken(localStorage.getItem("infrapilot_vercel_token") || "");
      setRailwayToken(localStorage.getItem("infrapilot_railway_token") || "");
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("infrapilot_gemini_key", geminiKey);
      localStorage.setItem("infrapilot_github_token", gitToken);
      localStorage.setItem("infrapilot_vercel_token", vercelToken);
      localStorage.setItem("infrapilot_railway_token", railwayToken);
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

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
                placeholder="Enter Gemini API key for AI reasoning"
                className="font-mono text-xs text-white placeholder-zinc-600 border-zinc-800 bg-zinc-900/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-500 block mb-1">GITHUB PERSONAL ACCESS TOKEN (PAT)</label>
              <Input
                type="password"
                value={gitToken}
                onChange={(e) => setGitToken(e.target.value)}
                placeholder="Enter GitHub PAT for cloning private repos"
                className="font-mono text-xs text-white placeholder-zinc-600 border-zinc-800 bg-zinc-900/40"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-500 block mb-1">VERCEL DEPLOYMENT TOKEN</label>
                <Input
                  type="password"
                  value={vercelToken}
                  onChange={(e) => setVercelToken(e.target.value)}
                  placeholder="sec_..."
                  className="font-mono text-xs text-white placeholder-zinc-600 border-zinc-800 bg-zinc-900/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-500 block mb-1">RAILWAY API TOKEN</label>
                <Input
                  type="password"
                  value={railwayToken}
                  onChange={(e) => setRailwayToken(e.target.value)}
                  placeholder="Enter Railway CLI push token"
                  className="font-mono text-xs text-white placeholder-zinc-600 border-zinc-800 bg-zinc-900/40"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Button 
                onClick={handleSave} 
                className="h-10 text-xs font-semibold px-4 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all"
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Saved Successfully!
                  </>
                ) : (
                  "Save Credentials"
                )}
              </Button>
              {isSaved && (
                <span className="text-xs text-emerald-400 font-mono animate-fadeIn">
                  Settings successfully written to LocalStorage.
                </span>
              )}
            </div>
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
          <CardContent className="p-6 space-y-4 text-xs leading-relaxed text-zinc-400 font-light font-mono text-[11px]">
            <p>
              By default, all sandbox containers run with read-only root filesystems and are limited to 1GB RAM and 0.5 vCPU threads.
            </p>
            <p>
              Self-healing patch iterations are capped at a maximum of 3 patches per single pipeline before raising human-intervention alarms.
            </p>
            <p className="text-zinc-500">
              🔒 All credentials are saved strictly inside your browser's local sandbox storage and never persist on our servers.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
