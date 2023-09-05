import { twMerge } from "tailwind-merge";

interface CardFooterProps extends React.ComponentProps<"div"> {}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return <div className={twMerge("px-6 pb-6", className)} {...props} />;
}
