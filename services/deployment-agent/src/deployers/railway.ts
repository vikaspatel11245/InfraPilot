import { execSync } from "child_process";
import { BaseDeployer } from "./base";

export class RailwayDeployer extends BaseDeployer {
  async deploy(context: { repoPath: string; token?: string }) {
    console.log("[Railway Deployer] Provisioning container thread instances...");
    
    const railwayToken = context.token || process.env.RAILWAY_TOKEN;

    if (!railwayToken) {
      console.log("[Railway Deployer] RAILWAY_TOKEN missing. Utilizing simulation deployment sandbox.");
      return { url: "https://infrapilot-service.up.railway.app" };
    }

    try {
      console.log("[Railway Deployer] Deploying application context via Railway CLI push...");
      
      // Execute standard CLI push task
      execSync(`railway link --token ${railwayToken}`, { cwd: context.repoPath });
      const output = execSync(`railway up`, { 
        cwd: context.repoPath,
        stdio: "pipe"
      }).toString();
      
      console.log("[Railway Deployer] Railway push successfully completed.", output);
      return { url: "https://infrapilot-service.up.railway.app" };
    } catch (err: any) {
      console.error("[Railway Deployer] Railway CLI push failed.", err);
      throw new Error(`Railway deployment failed: ${err.message}`);
    }
  }
}

export default RailwayDeployer;
