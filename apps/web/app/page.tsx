import Link from "next/link";
import { ArrowRight, Bot, Cpu, Sparkles, Zap } from "lucide-react";
import { Button } from "@infrapilot/ui";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-4xl mx-auto px-4">
      {/* Glow highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating alert */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-6 animate-pulse">
        <Sparkles className="w-3.5 h-3.5" />
        New: Self-Healing Rollbacks Enabled
      </div>

      {/* Core title */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
        Autonomous AI Deployment Engineer
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed font-light">
        InfraPilot analyzes your codebase, selects optimal cloud services, generates deployment pipelines, streams logs, and heals production bugs automatically using agentic LLMs.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        <Link href="/deploy">
          <Button size="lg" className="gap-2 text-base font-semibold group h-12 shadow-lg shadow-indigo-500/20">
            Deploy Repository
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        
        <Link href="/dashboard">
          <Button variant="outline" size="lg" className="text-base">
            Launch Console
          </Button>
        </Link>
      </div>

      {/* Quick stats / Features showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full">
        <div className="p-6 rounded-xl border border-zinc-800/60 bg-zinc-950/40 backdrop-blur-sm flex flex-col items-center">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-white mb-2">Multi-Platform Deployers</h3>
          <p className="text-zinc-400 text-sm font-light text-center leading-relaxed">
            Deploy seamlessly to Vercel, Supabase, Railway, Render, Fly.io, and Cloudflare.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-zinc-800/60 bg-zinc-950/40 backdrop-blur-sm flex flex-col items-center">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-white mb-2">Automated Self-Healing</h3>
          <p className="text-zinc-400 text-sm font-light text-center leading-relaxed">
            AI agent matches logs to known framework patterns and applies live code patches on failure.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-zinc-800/60 bg-zinc-950/40 backdrop-blur-sm flex flex-col items-center">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-white mb-2">Infrastructure Recommendation</h3>
          <p className="text-zinc-400 text-sm font-light text-center leading-relaxed">
            Intelligent parsing of package configurations to select optimal cost-effective cloud services.
          </p>
        </div>
      </div>
    </div>
  );
}
