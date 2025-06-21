"use client";

import {
  Controller,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import {
  DateRangePicker,
  type DateRangePickerProps,
} from "@heroui/date-picker";

interface RHFDateRangePickerProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<DateRangePickerProps, "name" | "defaultValue"> {}

export const RHFDateRangePicker = <T extends FieldValues>({
  name,
  validationBehavior = "aria",
  ...props
}: RHFDateRangePickerProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <DateRangePicker
          ref={field.ref}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          validationBehavior={validationBehavior}
          {...props}
        />
      )}
    />
  );
};
