import fs from "fs";
import path from "path";

export function inspectEnvVars(repoPath: string): string[] {
  console.log(`[Env Analyzer] Scanning files for environment configurations: ${repoPath}`);
  const envKeys = new Set<string>();

  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    for (const item of items) {
      if (item === "node_modules" || item === ".git" || item === ".next" || item === "dist") {
        continue;
      }
      
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (stat.isFile() && /\.(js|ts|tsx|jsx|json|py)$/.test(item)) {
        try {
          const content = fs.readFileSync(fullPath, "utf-8");
          // Match standard process.env.XXXX bindings
          const matches = content.matchAll(/process\.env\.([A-Z_0-9]+)/g);
          for (const match of matches) {
            envKeys.add(match[1]);
          }
        } catch {
          // Ignore read errors
        }
      }
    }
  }

  scanDir(repoPath);
  
  // Make sure we always include database defaults if no envs mapped
  const list = Array.from(envKeys);
  return list.length > 0 ? list : ["DATABASE_URL"];
}
