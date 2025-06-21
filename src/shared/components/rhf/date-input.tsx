"use client";

import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { DateInput, type DateInputProps } from "@heroui/date-input";

interface RHFDateInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<DateInputProps, "name" | "defaultValue"> {}

export const RHFDateInput = <T extends FieldValues>({
  name,
  validationBehavior = "aria",
  ...props
}: RHFDateInputProps<T>) => {
  const { field, fieldState } = useController<T>({ name });

  return (
    <DateInput
      ref={field.ref}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      validationBehavior={validationBehavior}
      {...props}
    />
  );
};
