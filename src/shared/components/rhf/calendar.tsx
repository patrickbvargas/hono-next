"use client";

import {
  Controller,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Calendar, type CalendarProps } from "@heroui/calendar";

interface RHFCalendarProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<CalendarProps, "name" | "defaultValue"> {}

export const RHFCalendar = <T extends FieldValues>({
  name,
  ...props
}: RHFCalendarProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Calendar
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
