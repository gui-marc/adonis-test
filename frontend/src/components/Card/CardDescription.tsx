import { twMerge } from "tailwind-merge";
import React from "react";

interface CardDescriptionProps extends React.ComponentProps<"p"> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={twMerge("text-base text-slate-11 mt-1", className)}
      {...props}
    />
  );
}
