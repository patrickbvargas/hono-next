"use client";

import {
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { cn } from "~/shared/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { RHFLabel, RHFDescription, RHFError } from "./utils";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { type RHFItem, type RHFCommonProps, type RHFClassNames } from "./types";

interface RHFCheckboxProps<T extends FieldValues>
  extends UseControllerProps<T>,
    RHFCommonProps<T> {
  items?: RHFItem[];
  orientation?: "horizontal" | "vertical";
  classNames?: RHFClassNames & {
    item?: string;
  };
}

export const RHFCheckbox = <T extends FieldValues>({
  name,
  control: providedControl,
  label,
  description,
  isRequired,
  isDisabled,
  items,
  orientation = "vertical",
  classNames,
  ...props
}: RHFCheckboxProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;

  // Single checkbox mode
  if (!items) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn("flex flex-row", classNames?.wrapper)}>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isDisabled}
                {...props}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
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
            <RHFError className={classNames?.error} />
          </FormItem>
        )}
      />
    );
  }

  // Multiple checkbox mode (checkbox group)
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={classNames?.wrapper}>
          <RHFLabel
            label={label}
            isRequired={isRequired}
            className={classNames?.label}
          />
          <RHFDescription
            description={description}
            className={classNames?.description}
          />
          <div
            className={cn(
              "flex flex-col gap-2",
              orientation === "horizontal" && "flex-row",
            )}
          >
            {items.map((option) => (
              <FormField
                key={option.value}
                control={control}
                name={name}
                render={({ field }) => (
                  <FormItem
                    key={option.value}
                    className={cn(
                      "flex flex-row items-center gap-2",
                      classNames?.item,
                    )}
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, option.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value: unknown) => value !== option.value,
                                ),
                              );
                        }}
                        disabled={option.disabled || isDisabled}
                        {...props}
                      />
                    </FormControl>
                    <FormLabel>{option.label}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <RHFError className={classNames?.error} />
        </FormItem>
      )}
    />
  );
};
