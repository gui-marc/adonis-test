import { twMerge } from "tailwind-merge";
import React from "react";

interface CardTitleProps extends React.ComponentProps<"h3"> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={twMerge("text-xl font-semibold text-slate-12", className)}
      {...props}
    />
  );
}
