"use client";

import {
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { RHFDescription, RHFError, RHFLabel } from "./utils";
import { FormControl, FormField, FormItem } from "../ui/form";
import { type RHFClassNames, type RHFCommonProps } from "./types";

interface RHFTextAreaProps<T extends FieldValues>
  extends UseControllerProps<T>,
    RHFCommonProps<T>,
    Omit<React.ComponentProps<"textarea">, "name" | "defaultValue"> {
  classNames?: RHFClassNames;
}

export const RHFTextArea = <T extends FieldValues>({
  name,
  control: providedControl,
  label,
  description,
  isRequired,
  isDisabled,
  classNames,
  ...props
}: RHFTextAreaProps<T>) => {
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
            <Textarea {...field} disabled={isDisabled} {...props} />
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
