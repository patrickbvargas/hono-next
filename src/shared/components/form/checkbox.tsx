"use client";

import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Checkbox, type CheckboxProps } from "@heroui/checkbox";

interface RHFCheckboxProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<CheckboxProps, "name"> {
  control?: Control<T>;
}

export const RHFCheckbox = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFCheckboxProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid },
  } = useController<T>({ name, control });

  return (
    <Checkbox
      ref={ref}
      name={name}
      isSelected={value}
      onValueChange={onChange}
      onBlur={onBlur}
      isInvalid={invalid}
      {...props}
    />
  );
};
