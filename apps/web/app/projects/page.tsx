"use client";

import React from "react";
import { FolderGit2, Plus, GitBranch, ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@infrapilot/ui";
import Link from "next/link";

export default function Projects() {
  const projectsList = [
    { id: "1", name: "e-commerce-backend", repo: "github.com/vikas/e-commerce-backend", provider: "railway", status: "success" },
    { id: "2", name: "nextjs-landing-page", repo: "github.com/vikas/nextjs-landing-page", provider: "vercel", status: "success" },
    { id: "3", name: "redis-cache-service", repo: "github.com/vikas/redis-cache-service", provider: "render", status: "failed" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Projects Catalog
            <FolderGit2 className="w-5.5 h-5.5 text-indigo-400" />
          </h1>
          <p className="text-sm text-zinc-400 font-light mt-1">
            Browse and manage active connected repositories deployed across multi-cloud platforms.
          </p>
        </div>

        <Link href="/deploy">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Connect Project
          </Button>
        </Link>
      </div>

      {/* Grid of projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projectsList.map((project) => (
          <Card key={project.id} className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md hover:border-zinc-700/80 transition-all duration-200">
            <CardHeader className="p-6 border-b border-zinc-900/40 flex justify-between items-start space-y-0">
              <div>
                <CardTitle className="text-base font-bold text-white">{project.name}</CardTitle>
                <span className="text-[10px] text-zinc-500 font-mono mt-1 block uppercase tracking-wider">{project.provider}</span>
              </div>
              <Badge variant={project.status === "success" ? "success" : "error"} className="uppercase font-mono text-[9px] py-0.5">
                {project.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-850">
                <GitBranch className="w-3.5 h-3.5 text-zinc-500" />
                <span className="truncate">{project.repo}</span>
              </div>
              <div className="flex items-center gap-2 justify-between pt-2">
                <a href={`https://${project.repo}`} target="_blank" rel="noreferrer" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1">
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="h-8 gap-1 font-semibold text-xs text-indigo-400">
                    Console
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
