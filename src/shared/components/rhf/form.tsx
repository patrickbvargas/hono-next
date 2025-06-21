"use client";

import * as React from "react";
import {
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { cn } from "@heroui/react";
import { Form } from "@heroui/form";
import { RHFDebug } from "./aux/debug";

interface RHFFormProps<T extends FieldValues> extends UseFormReturn<T> {
  submitCallback: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
  showDebug?: boolean;
}

export const RHFForm = <T extends FieldValues>({
  children,
  className,
  submitCallback,
  handleSubmit,
  showDebug = false,
  ...props
}: RHFFormProps<T>) => {
  return (
    <FormProvider handleSubmit={handleSubmit} {...props}>
      <Form
        id="rhf-form"
        className={cn("flex flex-col gap-2", className)}
        onSubmit={handleSubmit(submitCallback)}
      >
        {children}
      </Form>
      {showDebug && <RHFDebug />}
    </FormProvider>
  );
};
