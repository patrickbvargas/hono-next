"use client";

import {
  CheckboxGroup,
  Checkbox,
  type CheckboxGroupProps,
} from "@heroui/checkbox";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { cn } from "@heroui/react";

interface RHFRootProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<CheckboxGroupProps, "name" | "defaultValue"> {}

const Root = <T extends FieldValues>({
  name,
  size,
  classNames,
  validationBehavior = "aria",
  ...props
}: RHFRootProps<T>) => {
  const { field, fieldState } = useController<T>({ name });

  return (
    <CheckboxGroup
      ref={field.ref}
      name={field.name}
      value={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      validationBehavior={validationBehavior}
      size={size}
      classNames={{
        ...classNames,
        label: cn(size === "sm" && "text-sm", classNames?.label),
      }}
      {...props}
    />
  );
};

export const RHFCheckboxGroup = {
  Root,
  Checkbox,
};
