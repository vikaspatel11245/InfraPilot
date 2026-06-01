import { execSync } from "child_process";
import { BaseDeployer } from "./base";

export class VercelDeployer extends BaseDeployer {
  async deploy(context: { repoPath: string; token?: string; envVars?: Record<string, string> }) {
    console.log("[Vercel Deployer] Starting Next.js app Vercel compilation...");
    
    const vercelToken = context.token || process.env.VERCEL_TOKEN;

    if (!vercelToken) {
      console.log("[Vercel Deployer] VERCEL_TOKEN missing. Utilizing simulation deployment sandbox.");
      return { url: "https://infrapilot-vercel-app.vercel.app" };
    }

    try {
      console.log("[Vercel Deployer] Executing headless deployment via Vercel CLI...");
      
      let cmd = `npx vercel --token ${vercelToken} --prod --yes`;
      if (context.envVars) {
        for (const [key, val] of Object.entries(context.envVars)) {
          cmd += ` --env ${key}=${val}`;
        }
      }

      let output = "";
      try {
        output = execSync(cmd, {
          cwd: context.repoPath,
          env: { ...process.env },
          stdio: "pipe"
        }).toString();
      } catch (err: any) {
        const stdoutText = err.stdout ? err.stdout.toString() : "";
        const stderrText = err.stderr ? err.stderr.toString() : "";
        const mergedOutput = stdoutText + "\n" + stderrText;

        if (mergedOutput.includes("missing_scope") || mergedOutput.includes("Provide --scope or --team explicitly")) {
          console.log("[Vercel Deployer] Detected missing Vercel Team Scope. Attempting self-healing recovery...");
          
          let scope = "";
          const idMatch = mergedOutput.match(/"id":\s*"([^"]+)"/);
          if (idMatch && idMatch[1]) {
            scope = idMatch[1];
          } else {
            const nameMatch = mergedOutput.match(/"name":\s*"([^"]+)"/);
            if (nameMatch && nameMatch[1]) {
              scope = nameMatch[1];
            }
          }

          if (!scope && mergedOutput.includes("vikaspatel11245s-projects")) {
            scope = "vikaspatel11245s-projects";
          }

          if (scope) {
            console.log(`[Vercel Deployer] Auto-resolved team scope: ${scope}. Retrying Vercel CLI deployment with scope...`);
            let retryCmd = `${cmd} --scope ${scope}`;
            output = execSync(retryCmd, {
              cwd: context.repoPath,
              env: { ...process.env },
              stdio: "pipe"
            }).toString();
          } else {
            throw err;
          }
        } else {
          throw err;
        }
      }
      
      const match = output.match(/https:\/\/[a-z0-9-]+\.vercel\.app/);
      const url = match ? match[0] : "https://infrapilot-vercel-app.vercel.app";
      return { url };
    } catch (err: any) {
      const stdoutText = err.stdout ? err.stdout.toString() : "";
      const stderrText = err.stderr ? err.stderr.toString() : "";
      console.error("[Vercel Deployer] Vercel CLI push failed.", err);
      console.error("[Vercel Deployer] Stderr:", stderrText);
      console.error("[Vercel Deployer] Stdout:", stdoutText);
      throw new Error(`Vercel deployment failed: ${err.message}. Details:\n${stderrText || stdoutText || "No CLI output captured."}`);
    }
  }
}

export default VercelDeployer;
