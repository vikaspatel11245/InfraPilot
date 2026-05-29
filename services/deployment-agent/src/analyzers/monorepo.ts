import fs from "fs";
import path from "path";

export interface MonorepoInfo {
  isMonorepo: boolean;
  type: "pnpm" | "yarn" | "hybrid" | "none";
  backendPath?: string;
  frontendPath?: string;
}

export function detectMonorepo(repoPath: string): MonorepoInfo {
  console.log(`[Monorepo Analyzer] Probing workspaces parameters at: ${repoPath}`);
  
  // 1. Standard PNPM Workspace Check
  const pnpmWorkspace = path.join(repoPath, "pnpm-workspace.yaml");
  if (fs.existsSync(pnpmWorkspace)) {
    return { 
      isMonorepo: true, 
      type: "pnpm",
      backendPath: "apps/api",
      frontendPath: "apps/web"
    };
  }

  // 2. Standard Yarn/NPM Workspaces Check
  const pjsonPath = path.join(repoPath, "package.json");
  if (fs.existsSync(pjsonPath)) {
    try {
      const pjson = JSON.parse(fs.readFileSync(pjsonPath, "utf-8"));
      if (pjson.workspaces) {
        return { 
          isMonorepo: true, 
          type: "yarn",
          backendPath: "apps/api",
          frontendPath: "apps/web"
        };
      }
    } catch {
      // ignore parsing errors
    }
  }

  // 3. Proactive Hybrid/Custom Full-Stack Check (e.g. Next.js frontend + Python API backend)
  try {
    const subdirs = fs.readdirSync(repoPath).filter(f => {
      try {
        return fs.statSync(path.join(repoPath, f)).isDirectory() && !f.startsWith(".") && f !== "node_modules" && f !== "temp-deployments";
      } catch {
        return false;
      }
    });

    let frontendPath = "";
    let backendPath = "";

    // Direct check for standard apps folders first
    if (fs.existsSync(path.join(repoPath, "apps/web")) && fs.existsSync(path.join(repoPath, "apps/api"))) {
      return { 
        isMonorepo: true, 
        type: "hybrid",
        backendPath: "apps/api",
        frontendPath: "apps/web"
      };
    }

    // Look for any subdirectory containing a package.json with a web framework dependency (e.g. Next, React, Vue, Nuxt, Svelte)
    for (const dir of subdirs) {
      const subPjsonPath = path.join(repoPath, dir, "package.json");
      if (fs.existsSync(subPjsonPath)) {
        try {
          const subPjson = JSON.parse(fs.readFileSync(subPjsonPath, "utf-8"));
          const deps = { ...(subPjson.dependencies || {}), ...(subPjson.devDependencies || {}) };
          if (deps["next"] || deps["react"] || deps["vue"] || deps["nuxt"] || deps["svelte"] || deps["@angular/core"]) {
            frontendPath = dir;
            break;
          }
        } catch {
          // ignore
        }
      }
    }

    // If frontend is found, look for backend signatures (Python, package.json APIs, etc.)
    if (frontendPath) {
      if (
        fs.existsSync(path.join(repoPath, "requirements.txt")) || 
        fs.existsSync(path.join(repoPath, "api.py")) || 
        fs.existsSync(path.join(repoPath, "main.py"))
      ) {
        backendPath = "."; // Root directory acts as backend
      } else {
        for (const dir of subdirs) {
          if (dir !== frontendPath) {
            if (
              fs.existsSync(path.join(repoPath, dir, "requirements.txt")) ||
              fs.existsSync(path.join(repoPath, dir, "package.json")) ||
              fs.existsSync(path.join(repoPath, dir, "api.py")) ||
              fs.existsSync(path.join(repoPath, dir, "main.py"))
            ) {
              backendPath = dir;
              break;
            }
          }
        }
      }
    }

    if (frontendPath && backendPath !== undefined) {
      console.log(`[Monorepo Analyzer] Detected hybrid full-stack system: Backend=${backendPath}, Frontend=${frontendPath}`);
      return {
        isMonorepo: true,
        type: "hybrid",
        backendPath,
        frontendPath
      };
    }
  } catch (err) {
    console.error("[Monorepo Analyzer] Proactive hybrid check failed.", err);
  }

  return { isMonorepo: false, type: "none" };
}
