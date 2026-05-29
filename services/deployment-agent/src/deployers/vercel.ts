import { BaseDeployer } from "./base";

export class VercelDeployer extends BaseDeployer {
  async deploy(context: any) {
    console.log("[Vercel Deployer] Starting Next.js app build compilation...");
    return { url: "https://infrapilot-vercel-app.vercel.app" };
  }
}
export default VercelDeployer;
