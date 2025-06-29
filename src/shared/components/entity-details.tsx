import * as React from "react";
import { cn } from "@heroui/react";

export const EntityDetails = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-wrap gap-4 sm:gap-8", className)} {...props} />
);

export const EntityDetailsGroup = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "min-w-5 max-w-52 w-full flex flex-col gap-4 sm:max-w-64 sm:gap-8",
      className,
    )}
    {...props}
  />
);
