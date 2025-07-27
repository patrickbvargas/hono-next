"use client";

import {
  Controller,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import {
  DateRangePicker,
  type DateRangePickerProps,
} from "@heroui/date-picker";

interface RHFDateRangePickerProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<DateRangePickerProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

export const RHFDateRangePicker = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFDateRangePickerProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { ref, value, onChange, onBlur },
        fieldState: { invalid, error },
      }) => (
        <DateRangePicker
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isInvalid={invalid}
          errorMessage={error?.message}
          {...props}
        />
      )}
    />
  );
};
