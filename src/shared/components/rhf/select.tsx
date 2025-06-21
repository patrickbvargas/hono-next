"use client";

import {
  useController,
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
    Omit<SelectProps, "name"> {}

const Root = <T extends FieldValues>({
  name,
  validationBehavior = "aria",
  ...props
}: RHFSelectProps<T>) => {
  const { field, fieldState } = useController<T>({ name });

  return (
    <Select
      ref={field.ref}
      name={field.name}
      selectedKeys={field.value}
      onSelectionChange={(v) => field.onChange([...v])}
      onBlur={field.onBlur}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      validationBehavior={validationBehavior}
      {...props}
    />
  );
};

export const RHFSelect = {
  Root,
  Section: SelectSection,
  Item: SelectItem,
};
