import * as React from "react";
import { cn } from "~/shared/lib/utils";

export const Header = ({
  className,
  ...props
}: React.ComponentProps<"header">) => {
  return (
    <header
      className={cn(
        "flex items-center justify-start gap-4 p-2 h-12",
        className,
      )}
      {...props}
    />
  );
};
