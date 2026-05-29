import { BaseDeployer } from "./base";

export class RenderDeployer extends BaseDeployer {
  async deploy(context: any) {
    console.log("[Render Deployer] Initiating static compilation routing on Render...");
    return { url: "https://infrapilot-site.onrender.com" };
  }
}
export default RenderDeployer;
