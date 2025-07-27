"use client";

import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { cn } from "@heroui/react";
import { RadioGroup, Radio, type RadioGroupProps } from "@heroui/radio";

interface RHFRadioGroupProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<RadioGroupProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

const Root = <T extends FieldValues>({
  name,
  control: providedControl,
  size = "sm",
  classNames,
  ...props
}: RHFRadioGroupProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control });

  return (
    <RadioGroup
      ref={ref}
      name={name}
      value={value?.toString()}
      onValueChange={onChange}
      onBlur={onBlur}
      isInvalid={invalid}
      errorMessage={error?.message}
      size={size}
      classNames={{
        ...classNames,
        label: cn(
          size === "sm" && "text-sm text-foreground",
          classNames?.label,
        ),
      }}
      {...props}
    />
  );
};

export const RHFRadioGroup = {
  Root,
  Radio,
};
