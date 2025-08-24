"use client";

import {
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { cn } from "~/shared/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { RHFDescription, RHFError, RHFLabel } from "./utils";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { type RHFItem, type RHFCommonProps, type RHFClassNames } from "./types";

interface RHFComboboxProps<T extends FieldValues>
  extends UseControllerProps<T>,
    RHFCommonProps<T> {
  items: RHFItem[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  classNames?: RHFClassNames & {
    item?: string;
  };
}

export const RHFCombobox = <T extends FieldValues>({
  name,
  control: providedControl,
  label,
  description,
  isRequired,
  isDisabled,
  items,
  placeholder = "Selecionar item...",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhum item encontrado",
  classNames,
  ...props
}: RHFComboboxProps<T>) => {
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
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={isDisabled}
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                  {...props}
                >
                  {field.value
                    ? items.find((item) => item.value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder={searchPlaceholder} className="h-9" />
                <CommandList>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={String(item.value)}
                        disabled={item.disabled}
                        onSelect={() => field.onChange(item.value)}
                        className={classNames?.item}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            String(field.value) === String(item.value)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
