import * as React from "react";
import { Skeleton } from "./";
import { cn } from "~/shared/lib/utils";

interface LoadingFallbackProps extends React.ComponentProps<typeof Skeleton> {
  className?: string;
}

export const LoadingFallback = ({
  className,
  ...props
}: LoadingFallbackProps) => {
  return (
    <Skeleton className={cn("h-4 w-full rounded-md", className)} {...props} />
  );
};
