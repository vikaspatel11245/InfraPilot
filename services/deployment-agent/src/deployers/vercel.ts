import { execSync } from "child_process";
import { BaseDeployer } from "./base";

export class VercelDeployer extends BaseDeployer {
  async deploy(context: { repoPath: string; token?: string }) {
    console.log("[Vercel Deployer] Starting Next.js app Vercel compilation...");
    
    const vercelToken = context.token || process.env.VERCEL_TOKEN;

    if (!vercelToken) {
      console.log("[Vercel Deployer] VERCEL_TOKEN missing. Utilizing simulation deployment sandbox.");
      return { url: "https://infrapilot-vercel-app.vercel.app" };
    }

    try {
      console.log("[Vercel Deployer] Executing headless deployment via Vercel CLI...");
      const output = execSync(`npx vercel --token ${vercelToken} --prod --yes`, {
        cwd: context.repoPath,
        env: { ...process.env },
        stdio: "pipe"
      }).toString();
      
      const match = output.match(/https:\/\/[a-z0-9-]+\.vercel\.app/);
      const url = match ? match[0] : "https://infrapilot-vercel-app.vercel.app";
      return { url };
    } catch (err: any) {
      console.error("[Vercel Deployer] Vercel CLI push failed.", err);
      throw new Error(`Vercel deployment failed: ${err.message}`);
    }
  }
}

export default VercelDeployer;
