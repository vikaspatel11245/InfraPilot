import { useEffect, useState } from "react";
import deploymentStore, { DeploymentStoreState } from "../store/deploymentStore";
import deploymentService from "../services/deployment.service";

export function useDeployment(id?: string) {
  const [state, setState] = useState<DeploymentStoreState>(deploymentStore.getState());

  useEffect(() => {
    const unsubscribe = deploymentStore.subscribe((newState) => {
      setState(newState);
    });

    if (id) {
      deploymentService.loadActiveDeployment(id);
    } else {
      deploymentService.loadAllDeployments();
    }

    return () => {
      unsubscribe();
      if (id) {
        deploymentService.unloadDeployment();
      }
    };
  }, [id]);

  return {
    deployments: state.deployments,
    activeDeployment: state.activeDeployment,
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    startDeployment: deploymentService.startDeployment,
    loadAllDeployments: deploymentService.loadAllDeployments,
  };
}

export default useDeployment;
