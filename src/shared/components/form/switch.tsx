"use client";

import {
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Switch } from "../ui/switch";
import { RHFDescription, RHFError, RHFLabel } from "./utils";
import { FormControl, FormField, FormItem } from "../ui/form";
import { type RHFClassNames, type RHFCommonProps } from "./types";
import { cn } from "~/shared/lib/utils";

interface RHFSwitchProps<T extends FieldValues>
  extends UseControllerProps<T>,
    RHFCommonProps<T> {
  classNames?: RHFClassNames;
}

export const RHFSwitch = <T extends FieldValues>({
  name,
  control: providedControl,
  label,
  description,
  isRequired,
  isDisabled,
  classNames,
  ...props
}: RHFSwitchProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center justify-between",
            classNames?.wrapper,
          )}
        >
          <div className="space-y-0.5">
            <RHFLabel
              label={label}
              isRequired={isRequired}
              className={classNames?.label}
            />
            <RHFDescription
              description={description}
              className={classNames?.description}
            />
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isDisabled}
              aria-readonly
              {...props}
            />
          </FormControl>
          <RHFError className={classNames?.error} />
        </FormItem>
      )}
    />
  );
};
