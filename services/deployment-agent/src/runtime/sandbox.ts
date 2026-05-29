import { spawn } from "child_process";
import { LogLine } from "@infrapilot/shared-types";

export interface SandboxBuildResult {
  success: boolean;
  errorLog?: string;
}

export function runSandboxedBuild(
  repoPath: string,
  onLog: (line: LogLine) => void
): Promise<SandboxBuildResult> {
  return new Promise((resolve) => {
    console.log(`[Sandbox Runtime] Triggering sandboxed npm run build inside: ${repoPath}`);
    
    // Spawns npm run build in parent node thread environment
    const proc = spawn("npm", ["run", "build"], { 
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
