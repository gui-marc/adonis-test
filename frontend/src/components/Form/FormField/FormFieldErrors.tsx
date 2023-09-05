import { useFormField } from "@/context/FormFieldProvider";
import { useFormContext } from "react-hook-form";

export default function FormFieldErrors() {
  const { name } = useFormField();
  const {
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name] as { message: string } | undefined;

  return <>{fieldError && <p className="text-red-10 text-sm mt-2">{fieldError.message}</p>}</>;
}
