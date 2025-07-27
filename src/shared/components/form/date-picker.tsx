"use client";

import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { DatePicker, type DatePickerProps } from "@heroui/date-picker";

interface RHFDatePickerProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<DatePickerProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

export const RHFDatePicker = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFDatePickerProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control });

  return (
    <DatePicker
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
