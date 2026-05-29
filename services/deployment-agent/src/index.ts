import { Orchestrator } from "./agent/orchestrator";
import { DeploymentWorkflow } from "./workflows/deployment.workflow";

console.log("-----------------------------------------------------------------");
console.log("[InfraPilot Agent Engine] Starting autonomous deploy orchestrator...");
console.log("-----------------------------------------------------------------");

const orchestrator = new Orchestrator();
orchestrator.execute();

const testWorkflow = new DeploymentWorkflow();
testWorkflow.run("https://github.com/vikas/demo", "main");
