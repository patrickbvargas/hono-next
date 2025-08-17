import * as React from "react";
import { cn } from "~/shared/lib/utils";
import { Skeleton } from "~/shared/components/ui/skeleton";

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
