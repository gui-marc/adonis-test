import React from "react";
import { twMerge } from "tailwind-merge";

interface CardBodyProps extends React.ComponentProps<"div"> {}

export function CardBody({ className, ...props }: CardBodyProps) {
  return <div className={twMerge("p-6", className)} {...props} />;
}
