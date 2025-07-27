"use client";

import {
  Controller,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { RangeCalendar, type RangeCalendarProps } from "@heroui/calendar";

interface RHFCalendarRangeProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<RangeCalendarProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

export const RHFCalendarRange = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFCalendarRangeProps<T>) => {
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
        <RangeCalendar
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
