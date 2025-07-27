"use client";

import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { DateInput, type DateInputProps } from "@heroui/date-input";

interface RHFDateInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<DateInputProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

export const RHFDateInput = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFDateInputProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control });

  return (
    <DateInput
      ref={ref}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={invalid}
      errorMessage={error?.message}
      {...props}
    />
  );
};
