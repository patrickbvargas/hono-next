"use client";

import {
  Controller,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { RangeCalendar, type RangeCalendarProps } from "@heroui/calendar";

interface RHFCalendarRangeProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<RangeCalendarProps, "name" | "defaultValue"> {}

export const RHFCalendarRange = <T extends FieldValues>({
  name,
  ...props
}: RHFCalendarRangeProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <RangeCalendar
          ref={field.ref}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          {...props}
        />
      )}
    />
  );
};
