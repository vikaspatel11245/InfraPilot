import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-100",
          {
            "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/10":
              variant === "primary",
            "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700/80":
              variant === "secondary",
            "border border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800/50":
              variant === "outline",
            "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-100":
              variant === "ghost",
            "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20":
              variant === "danger",
          },
          {
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
