import { Deployment, LogLine, DeploymentStatus } from "../types";

export interface DeploymentStoreState {
  deployments: Deployment[];
  activeDeployment: Deployment | null;
  logs: LogLine[];
  isConnecting: boolean;
  isConnected: boolean;
}

type Subscriber = (state: DeploymentStoreState) => void;

class DeploymentStore {
  private state: DeploymentStoreState = {
    deployments: [],
    activeDeployment: null,
    logs: [],
    isConnecting: false,
    isConnected: false,
  };

  private subscribers = new Set<Subscriber>();

  getState() {
    return this.state;
  }

  subscribe(sub: Subscriber) {
    this.subscribers.add(sub);
    return () => this.subscribers.delete(sub);
  }

  private notify() {
    this.subscribers.forEach(sub => sub({ ...this.state }));
  }

  setDeployments(deployments: Deployment[]) {
    this.state.deployments = deployments;
    this.notify();
  }

  setActiveDeployment(deployment: Deployment | null) {
    this.state.activeDeployment = deployment;
    if (deployment) {
      // Keep in deployments list updated
      const index = this.state.deployments.findIndex(d => d.id === deployment.id);
      if (index > -1) {
        this.state.deployments[index] = deployment;
      } else {
        this.state.deployments.unshift(deployment);
      }
    }
    this.notify();
  }

  updateActiveDeployment(updates: Partial<Deployment>) {
    if (!this.state.activeDeployment) return;
    this.state.activeDeployment = {
      ...this.state.activeDeployment,
      ...updates,
    };
    
    const index = this.state.deployments.findIndex(d => d.id === this.state.activeDeployment!.id);
    if (index > -1) {
      this.state.deployments[index] = this.state.activeDeployment;
    }
    this.notify();
  }

  addLog(log: LogLine) {
    this.state.logs = [...this.state.logs, log];
    this.notify();
  }

  setLogs(logs: LogLine[]) {
    this.state.logs = logs;
    this.notify();
  }

  clearLogs() {
    this.state.logs = [];
    this.notify();
  }

  setConnectionState(connecting: boolean, connected: boolean) {
    this.state.isConnecting = connecting;
    this.state.isConnected = connected;
    this.notify();
  }
}

export const deploymentStore = new DeploymentStore();
export default deploymentStore;
