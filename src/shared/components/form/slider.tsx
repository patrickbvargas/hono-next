"use client";

import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Slider, type SliderProps } from "@heroui/slider";

interface RHFSliderProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<SliderProps, "name" | "defaultValue"> {
  control?: Control<T>;
}

export const RHFSlider = <T extends FieldValues>({
  name,
  control: providedControl,
  ...props
}: RHFSliderProps<T>) => {
  const formContext = useFormContext<T>();
  const control = providedControl ?? formContext.control;
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController<T>({ name, control });

  return (
    <Slider
      ref={ref}
      name={name}
      value={value?.toString()}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={invalid}
      errorMessage={error?.message}
      {...props}
    />
  );
};
