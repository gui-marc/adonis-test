import { twMerge } from "tailwind-merge";
import React from "react";

export interface CardRootProps extends React.ComponentProps<"div"> {}

export function CardRoot({ className, ...props }: CardRootProps) {
  return (
    <div
      className={twMerge(
        "border border-slate-3 bg-slate-1 shadow rounded-lg",
        className
      )}
      {...props}
    />
  );
}
