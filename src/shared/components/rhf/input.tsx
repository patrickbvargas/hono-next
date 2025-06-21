"use client";

import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Input, type InputProps } from "@heroui/input";

interface RHFInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<InputProps, "name" | "defaultValue"> {}

export const RHFInput = <T extends FieldValues>({
  name,
  validationBehavior = "aria",
  ...props
}: RHFInputProps<T>) => {
  const { field, fieldState } = useController<T>({ name });

  return (
    <Input
      ref={field.ref}
      name={field.name}
      value={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      validationBehavior={validationBehavior}
      {...props}
    />
  );
};
