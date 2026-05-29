import fs from "fs";
import path from "path";

export function analyzeFramework(repoPath: string): string {
  console.log(`[Framework Analyzer] Scanning repository packages at: ${repoPath}`);
  const pjsonPath = path.join(repoPath, "package.json");
  
  if (!fs.existsSync(pjsonPath)) {
    return "vanilla-static";
  }

  try {
    const pjson = JSON.parse(fs.readFileSync(pjsonPath, "utf-8"));
    const deps = { ...(pjson.dependencies || {}), ...(pjson.devDependencies || {}) };

    if (deps["next"]) return "nextjs";
    if (deps["express"]) return "express-api";
    if (deps["react"] && deps["vite"]) return "vite-react";
    if (deps["@angular/core"]) return "angular";
    if (deps["vue"]) return "vue-app";
    
    return "node-generic";
  } catch (err) {
    console.error("Failed to parse package.json during framework scan.", err);
    return "node-generic";
  }
}
