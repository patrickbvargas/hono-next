import * as React from "react";
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { RHFDebug } from "./aux/debug";

interface Props<T extends FieldValues> extends UseFormReturn<T> {
  children: React.ReactNode;
  showDebug?: boolean;
}
export const RHFProvider = <T extends FieldValues>({
  children,
  showDebug,
  ...props
}: Props<T>) => {
  return (
    <FormProvider {...props}>
      {children}
      {showDebug && <RHFDebug {...props} />}
    </FormProvider>
  );
};
