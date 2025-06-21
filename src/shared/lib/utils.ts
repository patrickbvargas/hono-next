import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// TODO: remove this
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
