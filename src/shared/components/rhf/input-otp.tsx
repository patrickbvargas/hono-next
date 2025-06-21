"use client";

import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { InputOtp, type InputOtpProps } from "@heroui/input-otp";

interface RHFInputOtpProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<InputOtpProps, "name" | "defaultValue"> {}

export const RHFInputOtp = <T extends FieldValues>({
  name,
  validationBehavior = "aria",
  ...props
}: RHFInputOtpProps<T>) => {
  const { field, fieldState } = useController<T>({ name });

  return (
    <InputOtp
      ref={field.ref}
      name={field.name}
      value={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      validationBehavior={validationBehavior}
      {...props}
    />
  );
};
