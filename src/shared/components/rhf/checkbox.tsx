"use client";

import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Checkbox, type CheckboxProps } from "@heroui/checkbox";

interface RHFCheckboxProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<CheckboxProps, "name"> {}

export const RHFCheckbox = <T extends FieldValues>({
  name,
  validationBehavior = "aria",
  ...props
}: RHFCheckboxProps<T>) => {
  const { field, fieldState } = useController<T>({ name });

  return (
    <Checkbox
      ref={field.ref}
      name={field.name}
      isSelected={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={fieldState.invalid}
      validationBehavior={validationBehavior}
      {...props}
    />
  );
};
