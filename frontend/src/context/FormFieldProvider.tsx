import React from "react";

interface FormFieldContext {
  name: string;
}

export const FormFieldContext = React.createContext<FormFieldContext>({
  name: "",
});

// eslint-disable-next-line react-refresh/only-export-components
export const useFormField = () => React.useContext(FormFieldContext);

interface FormFieldProviderProps {
  name: string;
  children: React.ReactNode;
}

export function FormFieldProvider({ name, children }: FormFieldProviderProps) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  );
}
