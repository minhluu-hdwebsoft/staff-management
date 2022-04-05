import { yupResolver } from "@hookform/resolvers/yup";
import React, { ReactElement, useMemo } from "react";
import { DeepPartial, FormProvider, SubmitHandler, UnpackNestedValue, useForm, UseFormReturn } from "react-hook-form";
import * as yup from "yup";

interface FormProps<T> {
  children?: ReactElement | ReactElement[];
  defaultValues?: UnpackNestedValue<DeepPartial<T>>;
  onSubmit?: SubmitHandler<T>;
  schema?: yup.AnyObjectSchema;
  formMethods?: UseFormReturn<T, unknown>;
}

export function Form<T>({ children, defaultValues, onSubmit = () => null, schema, formMethods }: FormProps<T>) {
  const methods = useMemo(() => {
    if (formMethods) {
      return formMethods;
    }

    const resolver = schema ? yupResolver(schema) : undefined;
    return useForm<T>({ defaultValues, resolver });
  }, [formMethods]);

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {React.Children.map(children, (child) => {
          return child?.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: methods.register,
                  key: child.props.name,
                },
              })
            : child;
        })}
      </form>
    </FormProvider>
  );
}
