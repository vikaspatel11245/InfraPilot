import deploymentStore from "../store/deploymentStore";
import { LogLine, Deployment } from "../types";

class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectTimeout: any = null;

  connect(deploymentId: string) {
    if (this.socket) {
      this.socket.close();
    }

    deploymentStore.setConnectionState(true, false);

    const wsUrl = `ws://localhost:4000/ws/deployments/${deploymentId}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log("WebSocket connected for deployment:", deploymentId);
      deploymentStore.setConnectionState(false, true);
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === "log") {
          deploymentStore.addLog(data.payload as LogLine);
        } else if (data.type === "status") {
          deploymentStore.updateActiveDeployment(data.payload as Partial<Deployment>);
        } else if (data.type === "thought") {
          const active = deploymentStore.getState().activeDeployment;
          if (active) {
            const thoughts = [...(active.agentThoughts || []), data.payload];
            deploymentStore.updateActiveDeployment({ agentThoughts: thoughts });
          }
        }
      } catch (err) {
        console.error("Error parsing WS message", err);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket closed");
      deploymentStore.setConnectionState(false, false);
      // Auto reconnect
      this.reconnectTimeout = setTimeout(() => this.connect(deploymentId), 3000);
    };

    this.socket.onerror = (err) => {
      console.error("WebSocket error", err);
      deploymentStore.setConnectionState(false, false);
    };
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.socket) {
      this.socket.onclose = null; // Prevent reconnect
      this.socket.close();
      this.socket = null;
    }
    deploymentStore.setConnectionState(false, false);
  }
}

export const websocketService = new WebSocketService();
export default websocketService;
