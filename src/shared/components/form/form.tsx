"use client";

import * as React from "react";
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { Form } from "../ui/form";
import { RHFDebug } from "./utils";
import { cn } from "~/shared/lib/utils";

interface RHFFormProps<T extends FieldValues>
  extends UseFormReturn<T>,
    React.FormHTMLAttributes<HTMLFormElement> {
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
  ...props
}: RHFFormProps<T>) => {
  const formContent = (
    <React.Fragment>
      <form
        id="rhf-form"
        onSubmit={handleSubmit(submitCallback)}
        className={cn("h-full grid grid-cols-1 gap-4 my-0.5", className)}
      >
        {children}
      </form>
      {showDebug && <RHFDebug {...props} />}
    </React.Fragment>
  );

  return disableFormContext ? (
    formContent
  ) : (
    <Form handleSubmit={handleSubmit} {...props}>
      {formContent}
    </Form>
  );
};
