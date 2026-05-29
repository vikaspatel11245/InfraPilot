import type { Metadata } from "next";
import "../styles/global.css";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Rocket, 
  Activity, 
  FolderGit2, 
  Bot, 
  Settings, 
  Terminal,
  ShieldCheck
} from "lucide-react";

export const metadata: Metadata = {
  title: "InfraPilot - Autonomous AI Deployment Engineer",
  description: "Deploy, analyze, and self-heal your cloud infrastructure autonomously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-100">
        {/* Left Sidebar Shell */}
        <aside className="w-64 border-r border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md flex flex-col justify-between hidden md:flex shrink-0">
          <div>
            {/* Header / Logo */}
            <div className="h-16 px-6 flex items-center border-b border-zinc-800/40 gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Rocket className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <span className="font-bold tracking-tight text-white text-base">Infra</span>
                <span className="font-semibold text-indigo-400 text-base">Pilot</span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="p-4 space-y-1">
              <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-900/60 hover:text-white transition-all group">
                <LayoutDashboard className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                Dashboard
              </Link>
              <Link href="/deploy" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-900/60 hover:text-white transition-all group">
                <Rocket className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                New Deployment
              </Link>
              <Link href="/projects" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-900/60 hover:text-white transition-all group">
                <FolderGit2 className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                Projects
              </Link>
              <Link href="/agents" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-900/60 hover:text-white transition-all group">
                <Bot className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                AI Agent Thoughts
              </Link>
              <Link href="/monitoring" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-900/60 hover:text-white transition-all group">
                <Activity className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                Live Monitoring
              </Link>
            </nav>
          </div>

          {/* Bottom Sidebar Config */}
          <div className="p-4 border-t border-zinc-800/40 space-y-1">
            <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-900/60 hover:text-white transition-all group">
              <Settings className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
              Settings
            </Link>
            <div className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Agent Active V1.0.0
            </div>
          </div>
        </aside>

        {/* Core Main View */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-zinc-800/80 px-6 flex items-center justify-between shrink-0 bg-zinc-950/30 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-mono text-zinc-400">vikas@infrapilot-shell</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Autonomous Engine Online
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/80 flex items-center justify-center font-bold text-xs text-white">
                VP
              </div>
            </div>
          </header>

          {/* Inner Content scrollable */}
          <main className="flex-1 overflow-y-auto p-8 relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
