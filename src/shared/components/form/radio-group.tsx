"use client";

import {
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { cn } from "~/shared/lib/utils";
import { RHFDescription, RHFError, RHFLabel } from "./utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { type RHFClassNames, type RHFCommonProps, type RHFItem } from "./types";

interface RHFRadioGroupProps<T extends FieldValues>
  extends UseControllerProps<T>,
    RHFCommonProps<T> {
  items: RHFItem[];
  orientation?: "horizontal" | "vertical";
  classNames?: RHFClassNames & {
    item?: string;
  };
}

export const RHFRadioGroup = <T extends FieldValues>({
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
}: RHFRadioGroupProps<T>) => {
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
          <FormControl className="mt-1">
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn(
                "flex flex-col gap-2",
                orientation === "horizontal" && "flex-row",
              )}
              {...props}
            >
              {items.map((item) => {
                const itemDisabled = item.disabled || isDisabled;

                return (
                  <FormItem
                    key={item.value}
                    className={cn(
                      "flex flex-row items-center gap-2",
                      classNames?.item,
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem
                        value={String(item.value)}
                        disabled={itemDisabled}
                      />
                    </FormControl>
                    <FormLabel className={cn(itemDisabled && "opacity-50")}>
                      {item.label}
                    </FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>
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
