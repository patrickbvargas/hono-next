"use client";

import {
  CheckboxGroup,
  Checkbox as CheckboxPrimitive,
  type CheckboxGroupProps,
  type CheckboxProps,
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
      classNames={{
        ...classNames,
        label: cn("text-sm", classNames?.label),
      }}
      {...props}
    />
  );
};

const Checkbox = ({ ...props }: CheckboxProps) => {
  return <CheckboxPrimitive classNames={{ label: "text-sm" }} {...props} />;
};

export const RHFCheckboxGroup = {
  Root,
  Checkbox,
};
