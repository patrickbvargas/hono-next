"use client";

import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Switch, type SwitchProps } from "@heroui/switch";

interface RHFSwitchProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<SwitchProps, "name"> {}

export const RHFSwitch = <T extends FieldValues>({
  name,
  ...props
}: RHFSwitchProps<T>) => {
  const { field } = useController<T>({ name });

  return (
    <Switch
      ref={field.ref}
      name={field.name}
      isSelected={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
      {...props}
    />
  );
};
