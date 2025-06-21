"use client";

import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Textarea, type TextAreaProps } from "@heroui/input";

interface RHFTextAreaProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<TextAreaProps, "name" | "defaultValue"> {}

export const RHFTextArea = <T extends FieldValues>({
  name,
  validationBehavior = "aria",
  ...props
}: RHFTextAreaProps<T>) => {
  const { field, fieldState } = useController<T>({ name });

  return (
    <Textarea
      ref={field.ref}
      name={field.name}
      value={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      validationBehavior={validationBehavior}
      {...props}
    />
  );
};
