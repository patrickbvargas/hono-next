"use client";

import {
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { RHFClassNames, RHFCommonProps } from "./types";
import { RHFDescription, RHFError, RHFLabel } from "./utils";
import { FormControl, FormField, FormItem } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

interface RHFInputOTPProps<T extends FieldValues>
  extends UseControllerProps<T>,
    RHFCommonProps<T> {
  maxLength?: number;
  classNames?: RHFClassNames;
}

export const RHFInputOTP = <T extends FieldValues>({
  name,
  control: providedControl,
  label,
  description,
  isRequired,
  maxLength = 6,
  isDisabled,
  classNames,
  ...props
}: RHFInputOTPProps<T>) => {
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
            <InputOTP
              maxLength={maxLength}
              disabled={isDisabled}
              {...field}
              {...props}
            >
              <InputOTPGroup>
                {Array.from({ length: maxLength }, (_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
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
