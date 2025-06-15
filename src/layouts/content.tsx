import * as React from "react";
import { cn } from "~/shared/lib/utils";

export const Content = ({
  className,
  ...props
}: React.ComponentProps<"main">) => {
  return (
    <main
      className={cn("size-full overflow-hidden pt-2 pb-6 px-6", className)}
      {...props}
    />
  );
};
