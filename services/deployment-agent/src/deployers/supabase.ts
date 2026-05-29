import { BaseDeployer } from "./base";

export class SupabaseDeployer extends BaseDeployer {
  async deploy(context: any) {
    console.log("[Supabase Deployer] Deploying PostgreSQL migrations and database policies...");
    return { url: "https://infrapilot-db.supabase.co" };
  }
}
export default SupabaseDeployer;
