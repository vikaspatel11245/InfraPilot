import { useEffect, useState } from "react";
import deploymentStore from "../store/deploymentStore";
import { LogLine, DeploymentPhase } from "../types";

export function useLogStream(filterPhase?: DeploymentPhase | "all") {
  const [logs, setLogs] = useState<LogLine[]>(deploymentStore.getState().logs);

  useEffect(() => {
    const unsubscribe = deploymentStore.subscribe((state) => {
      if (!filterPhase || filterPhase === "all") {
        setLogs(state.logs);
      } else {
        setLogs(state.logs.filter((log) => log.phase === filterPhase));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [filterPhase]);

  return logs;
}

export default useLogStream;
