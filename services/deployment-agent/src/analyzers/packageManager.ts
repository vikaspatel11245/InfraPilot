import fs from "fs";
import path from "path";

export function selectPackageManager(repoPath: string): "npm" | "pnpm" | "yarn" {
  console.log(`[PM Analyzer] Mapped packager lockfile configs at: ${repoPath}`);
  
  if (fs.existsSync(path.join(repoPath, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  
  if (fs.existsSync(path.join(repoPath, "yarn.lock"))) {
    return "yarn";
  }
  
  if (fs.existsSync(path.join(repoPath, "package-lock.json"))) {
    return "npm";
  }

  return "npm";
}
