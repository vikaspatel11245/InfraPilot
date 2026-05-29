import { BaseDeployer } from "./base";

export class RailwayDeployer extends BaseDeployer {
  async deploy(context: any) {
    console.log("[Railway Deployer] Provisioning container thread instances...");
    return { url: "https://infrapilot-service.up.railway.app" };
  }
}
export default RailwayDeployer;
