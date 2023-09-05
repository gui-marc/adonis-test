import { useFormField } from "@/context/FormFieldProvider";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const textInputVariants = tv({
  base: "w-full text-base px-4 h-10 rounded-md border placeholder:text-slate-11",
  variants: {
    state: {
      valid: "bg-green-3 border-green-6 text-green-12",
      invalid: "bg-red-3 border-red-6 text-red-12",
      neutral: "bg-slate-3 border-slate-6 text-slate-12",
    },
  },
  defaultVariants: {
    state: "neutral",
  },
});

interface FormFieldTextInputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof textInputVariants> {}

export function FormFieldTextInput({
  className,
  ...props
}: FormFieldTextInputProps) {
  const { name } = useFormField();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = errors[name];

  return (
    <input
      id={`field-${name}`}
      type="text"
      className={twMerge(
        textInputVariants({ state: hasError ? "invalid" : "neutral" }),
        className
      )}
      {...props}
      {...register(name)}
    />
  );
}
