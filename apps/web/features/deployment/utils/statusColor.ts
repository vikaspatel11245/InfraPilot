import { DeploymentStatus, DeploymentPhase } from "../types";

export function getStatusColor(status: DeploymentStatus): string {
  switch (status) {
    case "success":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "failed":
      return "text-red-400 bg-red-500/10 border-red-500/20";
    case "rollback":
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    case "idle":
      return "text-zinc-400 bg-zinc-800/40 border-zinc-700/50";
    case "queued":
      return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    default:
      return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
  }
}

export function getPhaseStatusColor(status: "pending" | "running" | "success" | "failed"): string {
  switch (status) {
    case "success":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "failed":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "running":
      return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30 animate-pulse";
    default:
      return "bg-zinc-800/50 text-zinc-500 border-zinc-800/80";
  }
}
