import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { z } from "zod";

interface FormRootProps<TValues extends FieldValues>
  extends React.ComponentProps<"form"> {
  schema: z.Schema<TValues>;
  defaultValues?: DefaultValues<TValues>;
  handleSubmit: (data: TValues) => void;
  children?: React.ReactNode;
}

export function FormRoot<T extends FieldValues>({
  handleSubmit,
  defaultValues,
  children,
  schema,
  ...props
}: FormRootProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}
