"use client";

import {
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RHFDescription, RHFError, RHFLabel } from "./utils";
import { FormControl, FormField, FormItem } from "../ui/form";
import { type RHFItem, type RHFCommonProps, type RHFClassNames } from "./types";

interface RHFSelectProps<T extends FieldValues>
  extends UseControllerProps<T>,
    RHFCommonProps<T> {
  items: RHFItem[];
  placeholder?: string;
  classNames?: RHFClassNames & {
    item?: string;
  };
}

export const RHFSelect = <T extends FieldValues>({
  name,
  control: providedControl,
  label,
  description,
  isRequired,
  isDisabled,
  placeholder,
  items,
  classNames,
  ...props
}: RHFSelectProps<T>) => {
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
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isDisabled}
            {...props}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem
                  key={item.value}
                  disabled={item.disabled}
                  value={String(item.value)}
                  className={classNames?.item}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
