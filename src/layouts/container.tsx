import * as React from "react";
import { cn } from "~/shared/lib/utils";

export const Container = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "relative h-screen max-w-7xl container mx-auto overflow-hidden",
        "md:rounded-xl bg-background",
        className,
      )}
      {...props}
    />
  );
};
