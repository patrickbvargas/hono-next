"use client";

import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
  type AutocompleteProps,
} from "@heroui/autocomplete";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

interface RHFRootProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<AutocompleteProps, "name"> {}

const Root = <T extends FieldValues>({
  name,
  children,
  validationBehavior = "aria",
  ...props
}: RHFRootProps<T>) => {
  const { field, fieldState } = useController<T>({ name });

  return (
    <Autocomplete
      ref={field.ref}
      name={field.name}
      selectedKey={field.value}
      onSelectionChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      validationBehavior={validationBehavior}
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
