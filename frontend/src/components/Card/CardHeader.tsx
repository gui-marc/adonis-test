import { twMerge } from "tailwind-merge";
import React from "react";

export interface CardHeaderProps extends React.ComponentProps<"div"> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={twMerge("pt-6 px-6", className)} {...props} />;
}
