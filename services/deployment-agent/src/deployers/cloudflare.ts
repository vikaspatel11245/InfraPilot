import { BaseDeployer } from "./base";

export class CloudflareDeployer extends BaseDeployer {
  async deploy(context: any) {
    console.log("[Cloudflare Deployer] Uploading static assets to Cloudflare Pages...");
    return { url: "https://infrapilot-static.pages.dev" };
  }
}
export default CloudflareDeployer;
