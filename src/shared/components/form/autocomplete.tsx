"use client";

import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
  type AutocompleteProps,
} from "@heroui/autocomplete";
import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

interface RHFRootProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<AutocompleteProps, "name"> {
  control?: Control<T>;
}

const Root = <T extends FieldValues>({
  name,
  control: providedControl,
  children,
  ...props
}: RHFRootProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control });

  return (
    <Autocomplete
      ref={ref}
      name={name}
      selectedKey={value?.toString()}
      onSelectionChange={onChange}
      onBlur={onBlur}
      isInvalid={invalid}
      errorMessage={error?.message}
      {...props}
    >
      {children}
    </Autocomplete>
  );
};

export const RHFAutocomplete = {
  Root,
  Section: AutocompleteSection,
  Item: AutocompleteItem,
};
