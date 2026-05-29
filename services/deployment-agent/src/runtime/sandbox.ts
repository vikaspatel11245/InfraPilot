import { spawn } from "child_process";
import { LogLine } from "@infrapilot/shared-types";

export interface SandboxBuildResult {
  success: boolean;
  errorLog?: string;
}

export function runSandboxedBuild(
  repoPath: string,
  packageManager: "npm" | "pnpm" | "yarn",
  onLog: (line: LogLine) => void
): Promise<SandboxBuildResult> {
  return new Promise((resolve) => {
    let cmd = "npm";
    let args = ["run", "build"];

    if (packageManager === "pnpm") {
      cmd = "pnpm";
      args = ["build"];
    } else if (packageManager === "yarn") {
      cmd = "yarn";
      args = ["build"];
    }

    console.log(`[Sandbox Runtime] Triggering sandboxed ${cmd} ${args.join(" ")} inside: ${repoPath}`);
    
    // Spawns production build command inside target repository environment
    const proc = spawn(cmd, args, { 
      cwd: repoPath, 
      shell: true,
      env: { ...process.env, NODE_ENV: "production" }
    });
    
    let errorLog = "";

    proc.stdout?.on("data", (data) => {
      const message = data.toString();
      onLog({
        timestamp: new Date().toISOString(),
        source: "stdout",
        message
      });
    });

    proc.stderr?.on("data", (data) => {
      const message = data.toString();
      errorLog += message;
      onLog({
        timestamp: new Date().toISOString(),
        source: "stderr",
        message
      });
    });

    proc.on("close", (code) => {
      if (code === 0) {
        console.log("[Sandbox Runtime] Build successfully compiled with code 0.");
        resolve({ success: true });
      } else {
        console.warn(`[Sandbox Runtime] Build failed with non-zero exit code: ${code}`);
        resolve({ success: false, errorLog });
      }
    });

    proc.on("error", (err) => {
      console.error("[Sandbox Runtime] Process execution error", err);
      resolve({ success: false, errorLog: err.message });
    });
  });
}
