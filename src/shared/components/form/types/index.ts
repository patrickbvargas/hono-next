import { type Control, type FieldValues } from "react-hook-form";

export interface RHFClassNames {
  wrapper?: string;
  label?: string;
  description?: string;
  error?: string;
}

export interface RHFItem {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface RHFCommonProps<T extends FieldValues> {
  control?: Control<T>;
  label?: string;
  description?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}
