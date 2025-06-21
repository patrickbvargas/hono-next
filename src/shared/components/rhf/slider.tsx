"use client";

import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Slider, type SliderProps } from "@heroui/slider";

interface RHFSliderProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<SliderProps, "name" | "defaultValue"> {}

export const RHFSlider = <T extends FieldValues>({
  name,
  ...props
}: RHFSliderProps<T>) => {
  const { field, fieldState } = useController<T>({ name });

  return (
    <Slider
      ref={field.ref}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      {...props}
    />
  );
};
