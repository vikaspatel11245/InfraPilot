import { 
  fetchDeployments, 
  fetchDeploymentById, 
  triggerDeployment 
} from "../api/deployment.api";
import deploymentStore from "../store/deploymentStore";
import websocketService from "./websocket.service";

export const deploymentService = {
  async loadAllDeployments() {
    const list = await fetchDeployments();
    deploymentStore.setDeployments(list);
  },

  async loadActiveDeployment(id: string) {
    const deployment = await fetchDeploymentById(id);
    deploymentStore.setActiveDeployment(deployment);
    if (deployment) {
      // Connect to WebSocket for live streaming
      websocketService.connect(id);
    }
  },

  async startDeployment(repoUrl: string, branch: string = "main") {
    deploymentStore.clearLogs();
    const deployment = await triggerDeployment(repoUrl, branch);
    if (deployment) {
      deploymentStore.setActiveDeployment(deployment);
      websocketService.connect(deployment.id);
      return deployment.id;
    }
    return null;
  },

  unloadDeployment() {
    websocketService.disconnect();
    deploymentStore.setActiveDeployment(null);
    deploymentStore.clearLogs();
  }
};

export default deploymentService;
