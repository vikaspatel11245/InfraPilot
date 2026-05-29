import { BaseDeployer } from "./base";

export class FlyIoDeployer extends BaseDeployer {
  async deploy(context: any) {
    console.log("[FlyIo Deployer] Triggering Fly Machines orchestration...");
    return { url: "https://infrapilot-api.fly.dev" };
  }
}
export default FlyIoDeployer;
