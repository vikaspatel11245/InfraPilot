import { Deployment, DeploymentPhaseState } from "../types";

export function usePhase(deployment: Deployment | null) {
  if (!deployment) {
    return {
      activePhase: null,
      progressPercent: 0,
      phasesList: [] as DeploymentPhaseState[],
    };
  }

  const phasesList = Object.values(deployment.phases).sort((a, b) => {
    const order = ["setup", "analysis", "planning", "provisioning", "building", "deploying", "verifying", "done"];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });

  const activePhase = phasesList.find((p) => p.status === "running") || null;

  const completedCount = phasesList.filter((p) => p.status === "success").length;
  const progressPercent = Math.round((completedCount / phasesList.length) * 100);

  return {
    activePhase,
    progressPercent,
    phasesList,
  };
}

export default usePhase;
