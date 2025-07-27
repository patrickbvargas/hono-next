"use client";

import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Textarea, type TextAreaProps } from "@heroui/input";

interface RHFTextAreaProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<TextAreaProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

export const RHFTextArea = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFTextAreaProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control });

  return (
    <Textarea
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
