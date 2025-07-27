"use client";

import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { InputOtp, type InputOtpProps } from "@heroui/input-otp";

interface RHFInputOtpProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<InputOtpProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

export const RHFInputOtp = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFInputOtpProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control });

  return (
    <InputOtp
      ref={ref}
      name={name}
      value={value?.toString()}
      onValueChange={onChange}
      onBlur={onBlur}
      isInvalid={invalid}
      errorMessage={error?.message}
      {...props}
    />
  );
};
