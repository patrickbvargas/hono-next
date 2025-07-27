import { cn } from "@heroui/react";
import { Divider, type DividerProps } from "@heroui/divider";

export const RHFDivider = ({ className, ...props }: DividerProps) => {
  return (
    <Divider className={cn("w-5 my-1 hidden md:block", className)} {...props} />
  );
};
