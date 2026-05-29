export type DeploymentStatus = 'idle' | 'queued' | 'analyzing' | 'planning' | 'deploying' | 'verifying' | 'success' | 'failed' | 'rollback';

export type DeploymentPhase = 'setup' | 'analysis' | 'planning' | 'provisioning' | 'building' | 'deploying' | 'verifying' | 'done';

export interface LogLine {
  timestamp: string;
  source: 'stdout' | 'stderr' | 'system' | 'agent' | 'error';
  message: string;
  phase?: DeploymentPhase;
}

export interface DeploymentPhaseState {
  name: DeploymentPhase;
  status: 'pending' | 'running' | 'success' | 'failed';
  startedAt?: string;
  completedAt?: string;
  description: string;
}

export interface PlatformConfig {
  provider: 'vercel' | 'railway' | 'render' | 'flyio' | 'cloudflare' | 'supabase';
  envVars: Record<string, string>;
  region?: string;
  plan?: string;
}

export interface RecommendedInfra {
  provider: PlatformConfig['provider'];
  estimatedCost: string;
  confidence: number;
  reasoning: string[];
  suggestedSpecs: {
    cpu?: string;
    memory?: string;
    database?: string;
  };
}

export interface DeploymentFix {
  id: string;
  title: string;
  errorMatched: string;
  fixApplied: string;
  status: 'applied' | 'failed';
  appliedAt: string;
}

export interface AgentThought {
  timestamp: string;
  type: 'observe' | 'analyze' | 'plan' | 'act' | 'reflect';
  thought: string;
  data?: any;
}

export interface Deployment {
  id: string;
  projectId: string;
  repoUrl: string;
  branch: string;
  commitHash?: string;
  commitMessage?: string;
  status: DeploymentStatus;
  currentPhase: DeploymentPhase;
  phases: Record<DeploymentPhase, DeploymentPhaseState>;
  recommendedInfra?: RecommendedInfra;
  appliedFixes: DeploymentFix[];
  agentThoughts: AgentThought[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  repoUrl: string;
  provider: PlatformConfig['provider'];
  lastDeploymentStatus?: DeploymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DeploymentMetrics {
  cpuUsage: number[];
  memoryUsage: number[];
  networkIn: number[];
  networkOut: number[];
  timestamps: string[];
}
