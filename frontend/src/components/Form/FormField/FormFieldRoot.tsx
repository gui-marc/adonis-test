import { FormFieldProvider } from "@/context/FormFieldProvider";
import { twMerge } from "tailwind-merge";

interface FormFieldRoot extends React.ComponentProps<"div"> {
  name: string;
}

export function FormFieldRoot({ name, className, ...props }: FormFieldRoot) {
  return (
    <FormFieldProvider name={name}>
      <div className={twMerge("mb-3 last:mb-0", className)} {...props} />
    </FormFieldProvider>
  );
}
