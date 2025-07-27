"use client";

import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import {
  Select,
  SelectSection,
  SelectItem,
  type SelectProps,
} from "@heroui/select";

interface RHFSelectProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<SelectProps, "name"> {
  control?: Control<T>;
}

const Root = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFSelectProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control });

  return (
    <Select
      ref={ref}
      name={name}
      selectedKeys={Array.from(value).map(String)}
      onSelectionChange={(v) => onChange([...v])}
      onBlur={onBlur}
      isInvalid={invalid}
      errorMessage={error?.message}
      {...props}
    />
  );
};

export const RHFSelect = {
  Root,
  Section: SelectSection,
  Item: SelectItem,
};
