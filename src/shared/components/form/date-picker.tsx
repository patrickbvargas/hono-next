"use client";

import {
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Button } from "../ui/button";
import { cn } from "~/shared/lib/utils";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Temporal } from "@js-temporal/polyfill";
import { formatter } from "~/shared/lib/formatter";
import type { DayPickerProps } from "react-day-picker";
import { RHFDescription, RHFError, RHFLabel } from "./utils";
import type { RHFClassNames, RHFCommonProps } from "./types";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface RHFDatePickerProps<T extends FieldValues>
  extends Omit<UseControllerProps<T>, "disabled">,
    Omit<DayPickerProps, "id" | "mode" | "classNames">,
    RHFCommonProps<T> {
  placeholder?: string;
  classNames?: RHFClassNames;
}

export const RHFDatePicker = <T extends FieldValues>({
  name,
  control: providedControl,
  label,
  description,
  isRequired,
  placeholder = "Selecionar uma data",
  isDisabled,
  classNames,
  ...props
}: RHFDatePickerProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={classNames?.wrapper}>
          <RHFLabel
            label={label}
            isRequired={isRequired}
            className={classNames?.label}
          />
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  disabled={isDisabled}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    formatter.temporalDate(field.value, true)
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  field.value ? temporalToDate(field.value) : field.value
                }
                onSelect={(v) => field.onChange(v ? dateToTemporal(v) : null)}
                startMonth={new Date(2020, 0)}
                endMonth={new Date(2035, 11)}
                disabled={isDisabled}
                {...props}
              />
            </PopoverContent>
          </Popover>
          <RHFDescription
            description={description}
            className={classNames?.description}
          />
          <RHFError className={classNames?.error} />
        </FormItem>
      )}
    />
  );
};

const temporalToDate = (plainDate: Temporal.PlainDate): Date =>
  new Date(plainDate.year, plainDate.month - 1, plainDate.day);

const dateToTemporal = (date: Date): Temporal.PlainDate =>
  Temporal.PlainDate.from({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
