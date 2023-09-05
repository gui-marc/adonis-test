import React from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const buttonVariants = tv({
  base: "flex-inline h-10 items-center justify-center gap-3 px-4 text-sm rounded-md font-bold transition-all duration-150 ease-out",
  variants: {
    intent: {
      primary: "bg-indigo-9 text-[#fff] hover:bg-indigo-10",
      secondary:
        "bg-slate-1 border border-slate-3 text-slate-12 hover:bg-slate-2",
    },
    full: {
      true: "w-full",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function _Button({ asChild, className, intent, full, ...props }, ref) {
    const Component = asChild ? "span" : "button";

    return (
      <Component
        ref={ref}
        className={twMerge(buttonVariants({ intent, full }), className)}
        {...props}
      />
    );
  }
);

export default Button;
