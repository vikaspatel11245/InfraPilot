import * as React from "react";
import { cn } from "./utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700/80 focus:ring-1 focus:ring-zinc-700/80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
