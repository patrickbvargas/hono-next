"use client";

import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { NumberInput, type NumberInputProps } from "@heroui/number-input";

interface RHFNumberProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<NumberInputProps, "name" | "defaultValue"> {}

export const RHFNumber = <T extends FieldValues>({
  name,
  validationBehavior = "aria",
  ...props
}: RHFNumberProps<T>) => {
  const { field, fieldState } = useController<T>({ name });

  return (
    <NumberInput
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
