"use client";

import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { RadioGroup, Radio, type RadioGroupProps } from "@heroui/radio";

interface RHFRadioGroupProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<RadioGroupProps, "name" | "defaultValue"> {}

const Root = <T extends FieldValues>({
  name,
  validationBehavior = "aria",
  ...props
}: RHFRadioGroupProps<T>) => {
  const { field, fieldState } = useController<T>({ name });

  return (
    <RadioGroup
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

export const RHFRadioGroup = {
  Root,
  Radio,
};
