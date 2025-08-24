"use client";

import {
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { InputTime } from "../ui/input-time";
import { RHFDescription, RHFError, RHFLabel } from "./utils";
import { FormControl, FormField, FormItem } from "../ui/form";
import { type RHFClassNames, type RHFCommonProps } from "./types";

interface RHFTimeProps<T extends FieldValues>
  extends UseControllerProps<T>,
    RHFCommonProps<T>,
    Omit<
      React.ComponentPropsWithoutRef<typeof InputTime>,
      "name" | "defaultValue"
    > {
  classNames?: RHFClassNames;
}

export const RHFTime = <T extends FieldValues>({
  name,
  control: providedControl,
  label,
  description,
  isRequired,
  classNames,
  ...props
}: RHFTimeProps<T>) => {
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
            <InputTime {...field} {...props} />
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
