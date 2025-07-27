"use client";

import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { NumberInput, type NumberInputProps } from "@heroui/number-input";

interface RHFNumberProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<NumberInputProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

export const RHFNumber = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFNumberProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control });

  return (
    <NumberInput
      ref={ref}
      name={name}
      value={value}
      onValueChange={onChange}
      onBlur={onBlur}
      isInvalid={invalid}
      errorMessage={error?.message}
      {...props}
    />
  );
};
