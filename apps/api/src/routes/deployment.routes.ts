import { Router } from "express";
import { Deployment, RecommendedInfra, DeploymentFix } from "@infrapilot/shared-types";
import { Orchestrator } from "@infrapilot/deployment-agent";


const router: Router = Router();

// In-memory mock database store
export const deploymentsDb: Record<string, Deployment> = {};

// Preseed with one successful sample deployment
const initialId = "mock-deploy-id-12345";
deploymentsDb[initialId] = {
  id: initialId,
  projectId: "proj-web-99",
  repoUrl: "https://github.com/vikaspatel11245/InfraPilot",
  branch: "main",
  status: "success",
  currentPhase: "done",
  phases: {
    setup: { name: "setup", status: "success", description: "Configured sandbox engine instances." },
    analysis: { name: "analysis", status: "success", description: "Inspected package settings." },
    planning: { name: "planning", status: "success", description: "Formulated cloud build charts." },
    provisioning: { name: "provisioning", status: "success", description: "Created virtual database clusters." },
    building: { name: "building", status: "success", description: "Compiled React targets." },
    deploying: { name: "deploying", status: "success", description: "Configured network switches." },
    verifying: { name: "verifying", status: "success", description: "Running network probes." },
    done: { name: "done", status: "success", description: "Complete." },
  },
  recommendedInfra: {
    provider: "vercel",
    estimatedCost: "$12.00",
    confidence: 0.98,
    reasoning: [
      "Repository utilizes Next.js App router standard.",
      "Optimized Vercel Edge caching matched dynamically."
    ],
    suggestedSpecs: {
      cpu: "0.5 Core",
      memory: "512MB RAM",
      database: "Supabase PG"
    }
  },
  appliedFixes: [
    {
      id: "fix-1",
      title: "Dockerfile lock resolution",
      errorMatched: "npm ERR! cb() never called!",
      fixApplied: "Upgraded npm package cache runner limits",
      status: "applied",
      appliedAt: new Date().toISOString()
    }
  ],
  agentThoughts: [
    { timestamp: new Date().toISOString(), type: "observe", thought: "Analyzing codebase profiles..." },
    { timestamp: new Date().toISOString(), type: "plan", thought: "Next.js matched. Launching Vercel adapter integrations." }
  ],
  createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
  updatedAt: new Date().toISOString()
};

router.get("/", (req, res) => {
  res.json(Object.values(deploymentsDb));
});

router.get("/:id", (req, res) => {
  const dep = deploymentsDb[req.params.id];
  if (!dep) {
    res.status(404).json({ error: "Deployment not found" });
    return;
  }
  res.json(dep);
});

router.post("/", (req, res) => {
  const { repoUrl, branch, vercelToken, railwayToken, geminiKey } = req.body;
  const newId = `deploy-${Math.random().toString(36).substring(2, 11)}`;

  const newDeployment: Deployment = {
    id: newId,
    projectId: `proj-${Math.random().toString(36).substring(2, 6)}`,
    repoUrl: repoUrl || "https://github.com/vikas/unknown",
    branch: branch || "main",
    status: "analyzing",
    currentPhase: "setup",
    phases: {
      setup: { name: "setup", status: "running", description: "Allocating sandbox engines..." },
      analysis: { name: "analysis", status: "pending", description: "Inspecting codebase structure..." },
      planning: { name: "planning", status: "pending", description: "Resolving targets..." },
      provisioning: { name: "provisioning", status: "pending", description: "Preparing databases..." },
      building: { name: "building", status: "pending", description: "Bundling targets..." },
      deploying: { name: "deploying", status: "pending", description: "Transferring compilation blocks..." },
      verifying: { name: "verifying", status: "pending", description: "Probing network routes..." },
      done: { name: "done", status: "pending", description: "Finish deployment task." },
    },
    appliedFixes: [],
    agentThoughts: [
      { timestamp: new Date().toISOString(), type: "observe", thought: "Scaffolding automated worker queues..." }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  deploymentsDb[newId] = newDeployment;
  
  // Kick off the real autonomous AI orchestrator asynchronously
  const orchestrator = new Orchestrator();
  orchestrator.run(newDeployment, (updates) => {
    deploymentsDb[newId] = {
      ...deploymentsDb[newId],
      ...updates,
    };
  }, {
    vercelToken,
    railwayToken,
    geminiKey
  }).catch((err) => {
    console.error(`Autonomous orchestration execution failed for deploy ID: ${newId}`, err);
  });

  res.status(201).json(newDeployment);
});

export default router;

// Helper to simulate live WS/database progression changes
function mockProgressRunner(id: string) {
  const order: (keyof Deployment["phases"])[] = ["setup", "analysis", "planning", "provisioning", "building", "deploying", "verifying", "done"];
  let stepIndex = 0;

  const interval = setInterval(() => {
    const dep = deploymentsDb[id];
    if (!dep) {
      clearInterval(interval);
      return;
    }

    const currentPhase = order[stepIndex];
    
    // Complete previous phase
    if (stepIndex > 0) {
      const prevPhase = order[stepIndex - 1];
      dep.phases[prevPhase].status = "success";
    }

    if (stepIndex < order.length - 1) {
      dep.phases[currentPhase].status = "running";
      dep.currentPhase = currentPhase;
      dep.status = "deploying";
      dep.agentThoughts.push({
        timestamp: new Date().toISOString(),
        type: stepIndex % 2 === 0 ? "plan" : "act",
        thought: `Orchestrating ${currentPhase} details: ${dep.phases[currentPhase].description}`
      });
      stepIndex++;
    } else {
      // Completed successfully!
      dep.phases.done.status = "success";
      dep.currentPhase = "done";
      dep.status = "success";
      dep.recommendedInfra = {
        provider: "railway",
        estimatedCost: "$5.00",
        confidence: 0.95,
        reasoning: ["Detected minimal container requirements.", "Mapped standard node runtime parameters."],
        suggestedSpecs: { cpu: "0.25 Core", memory: "256MB RAM", database: "SQLite" }
      };
      dep.agentThoughts.push({
        timestamp: new Date().toISOString(),
        type: "reflect",
        thought: "Pipeline verified. Services successfully routed online."
      });
      clearInterval(interval);
    }
    dep.updatedAt = new Date().toISOString();
  }, 4000);
}
