"use client";

import {
  Controller,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Calendar, type CalendarProps } from "@heroui/calendar";

interface RHFCalendarProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<CalendarProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

export const RHFCalendar = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFCalendarProps<T>) => {
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
        <Calendar
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
