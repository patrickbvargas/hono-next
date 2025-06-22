import * as React from "react";
import { cn } from "@heroui/react";

export const Content = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="content"
      className={cn("size-full overflow-auto p-4", className)}
      {...props}
    />
  );
};
