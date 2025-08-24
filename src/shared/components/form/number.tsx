"use client";

import {
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { InputNumber } from "../ui/input-number";
import { RHFDescription, RHFError, RHFLabel } from "./utils";
import { FormControl, FormField, FormItem } from "../ui/form";
import { type RHFClassNames, type RHFCommonProps } from "./types";

interface RHFNumberProps<T extends FieldValues>
  extends UseControllerProps<T>,
    RHFCommonProps<T>,
    Omit<
      React.ComponentPropsWithoutRef<typeof InputNumber>,
      "name" | "defaultValue"
    > {
  classNames?: RHFClassNames;
}

export const RHFNumber = <T extends FieldValues>({
  name,
  control: providedControl,
  label,
  description,
  isRequired,
  classNames,
  ...props
}: RHFNumberProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={classNames?.wrapper}>
          <RHFLabel
            label={label}
            isRequired={isRequired}
            className={classNames?.label}
          />
          <FormControl>
            <InputNumber isInvalid={fieldState.invalid} {...field} {...props} />
          </FormControl>
          <RHFDescription
            description={description}
            className={classNames?.description}
          />
          <RHFError className={classNames?.error} />
        </FormItem>
      )}
    />
  );
};
