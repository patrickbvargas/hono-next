"use client";

import {
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Input } from "../ui/input";
import { RHFLabel, RHFDescription, RHFError } from "./utils";
import { FormControl, FormField, FormItem } from "../ui/form";
import { type RHFClassNames, type RHFCommonProps } from "./types";

interface RHFInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    RHFCommonProps<T>,
    Omit<React.ComponentProps<"input">, "name" | "defaultValue"> {
  classNames?: RHFClassNames;
}

export const RHFInput = <T extends FieldValues>({
  name,
  control: providedControl,
  label,
  description,
  isRequired,
  isDisabled,
  classNames,
  ...props
}: RHFInputProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={classNames?.wrapper}>
          <RHFLabel
            label={label}
            isRequired={isRequired}
            className={classNames?.label}
          />
          <FormControl>
            <Input disabled={isDisabled} {...field} {...props} />
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
