"use client";

import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Input, type InputProps } from "@heroui/input";

interface RHFInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<InputProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

export const RHFInput = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFInputProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control });

  return (
    <Input
      ref={ref}
      name={name}
      value={value?.toString()}
      onValueChange={onChange}
      onBlur={onBlur}
      isInvalid={invalid}
      errorMessage={error?.message}
      {...props}
    />
  );
};
