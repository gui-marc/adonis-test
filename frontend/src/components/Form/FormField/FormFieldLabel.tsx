import { useFormField } from "@/context/FormFieldProvider";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface FormFieldLabelProps extends React.ComponentProps<"label"> {}

export function FormFieldLabel({ className, ...props }: FormFieldLabelProps) {
  const { name } = useFormField();
  const {
    formState: { errors },
  } = useFormContext();

  const hasError = errors[name];

  return (
    <label
      className={twMerge(
        "text-sm font-medium block mb-2",
        hasError ? "text-red-10" : "",
        className
      )}
      htmlFor={`field-${name}`}
      {...props}
    />
  );
}
