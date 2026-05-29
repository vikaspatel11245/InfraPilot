import { RecommendedInfra } from "../types";

export const infraService = {
  async getLiveMetrics(deploymentId: string) {
    try {
      const res = await fetch(`http://localhost:4000/api/deployments/${deploymentId}/metrics`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      // Mock metrics for smooth UI display when backend is bootstrapping
      const timestamps = Array.from({ length: 10 }, (_, i) => `${i * 10}s`);
      return {
        cpuUsage: Array.from({ length: 10 }, () => Math.floor(Math.random() * 40) + 10),
        memoryUsage: Array.from({ length: 10 }, () => Math.floor(Math.random() * 20) + 40),
        networkIn: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
        networkOut: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
        timestamps
      };
    }
  }
};

export default infraService;
