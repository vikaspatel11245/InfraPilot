import fs from "fs";
import path from "path";

export function detectMonorepo(repoPath: string) {
  console.log(`[Monorepo Analyzer] Probing workspaces parameters at: ${repoPath}`);
  
  const pnpmWorkspace = path.join(repoPath, "pnpm-workspace.yaml");
  if (fs.existsSync(pnpmWorkspace)) {
    return { isMonorepo: true, type: "pnpm" };
  }

  const pjsonPath = path.join(repoPath, "package.json");
  if (fs.existsSync(pjsonPath)) {
    try {
      const pjson = JSON.parse(fs.readFileSync(pjsonPath, "utf-8"));
      if (pjson.workspaces) {
        return { isMonorepo: true, type: "yarn" };
      }
    } catch {
      // ignore
    }
  }

  return { isMonorepo: false, type: "none" };
}
