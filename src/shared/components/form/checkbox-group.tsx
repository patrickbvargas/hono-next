"use client";

import {
  CheckboxGroup,
  Checkbox as CheckboxPrimitive,
  type CheckboxGroupProps,
  type CheckboxProps,
} from "@heroui/checkbox";
import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { cn } from "@heroui/react";

interface RHFRootProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<CheckboxGroupProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

const Root = <T extends FieldValues>({
  name,
  control: providedControl,
  size = "sm",
  classNames,
  ...props
}: RHFRootProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control });

  return (
    <CheckboxGroup
      ref={ref}
      name={name}
      value={Array.from(value).map(String)}
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

const Checkbox = ({ ...props }: CheckboxProps) => {
  return <CheckboxPrimitive classNames={{ label: "text-sm" }} {...props} />;
};

export const RHFCheckboxGroup = {
  Root,
  Checkbox,
};
