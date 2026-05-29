"use client";

import React from "react";
import { Loader2, CheckCircle2, AlertTriangle, AlertCircle, HelpCircle } from "lucide-react";
import { Badge } from "@infrapilot/ui";
import { DeploymentStatus } from "../types";
import { getStatusColor } from "../utils/statusColor";

interface DeploymentStatusProps {
  status: DeploymentStatus;
}

export function DeploymentStatusIndicator({ status }: DeploymentStatusProps) {
  let icon = <HelpCircle className="w-3.5 h-3.5" />;

  switch (status) {
    case "success":
      icon = <CheckCircle2 className="w-3.5 h-3.5" />;
      break;
    case "failed":
      icon = <AlertCircle className="w-3.5 h-3.5" />;
      break;
    case "rollback":
      icon = <AlertTriangle className="w-3.5 h-3.5" />;
      break;
    case "idle":
      icon = <HelpCircle className="w-3.5 h-3.5" />;
      break;
    default:
      icon = <Loader2 className="w-3.5 h-3.5 animate-spin" />;
      break;
  }

  const colorClass = getStatusColor(status);

  return (
    <Badge className={`uppercase font-mono text-[10px] py-1 px-2.5 flex items-center gap-1.5 ${colorClass}`}>
      {icon}
      {status}
    </Badge>
  );
}

export default DeploymentStatusIndicator;
