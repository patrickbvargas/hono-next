import { cn } from "@heroui/react";

export const RHFFieldset = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLFieldSetElement>) => {
  return <fieldset className={cn("w-full p-2", className)} {...props} />;
};
