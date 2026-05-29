import * as React from "react";
import { cn } from "./utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "neutral";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          {
            "bg-emerald-500/10 text-emerald-400 border-emerald-500/25":
              variant === "success",
            "bg-amber-500/10 text-amber-400 border-amber-500/25":
              variant === "warning",
            "bg-red-500/10 text-red-400 border-red-500/25":
              variant === "error",
            "bg-blue-500/10 text-blue-400 border-blue-500/25":
              variant === "info",
            "bg-zinc-800 text-zinc-300 border-zinc-700/80":
              variant === "neutral",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
