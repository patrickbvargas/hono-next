"use client";

import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Switch, type SwitchProps } from "@heroui/switch";

interface RHFSwitchProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<SwitchProps, "name"> {
  control?: Control<T>;
}

export const RHFSwitch = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFSwitchProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
  } = useController<T>({ name, control });

  return (
    <Switch
      ref={ref}
      name={name}
      isSelected={value}
      onValueChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
};
