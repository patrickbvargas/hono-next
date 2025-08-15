"use client";

import * as React from "react";
import {
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { cn } from "@heroui/react";
import { RHFDebug } from "./aux/debug";
import { Form, type FormProps } from "@heroui/form";

interface RHFFormProps<T extends FieldValues>
  extends UseFormReturn<T>,
    FormProps {
  submitCallback: SubmitHandler<T>;
  showDebug?: boolean;
  disableFormContext?: boolean;
}

export const RHFForm = <T extends FieldValues>({
  children,
  className,
  submitCallback,
  handleSubmit,
  showDebug = false,
  disableFormContext = false,
  validationBehavior = "aria",
  ...props
}: RHFFormProps<T>) => {
  const formContent = (
    <React.Fragment>
      <Form
        id="rhf-form"
        validationBehavior={validationBehavior}
        onSubmit={handleSubmit(submitCallback)}
        className={cn("grid grid-cols-1 gap-4", className)}
      >
        {children}
      </Form>
      {showDebug && <RHFDebug {...props} />}
    </React.Fragment>
  );

  return disableFormContext ? (
    formContent
  ) : (
    <FormProvider handleSubmit={handleSubmit} {...props}>
      {formContent}
    </FormProvider>
  );
};
