import { cn } from "@heroui/react";
import { Skeleton, type SkeletonProps } from "@heroui/skeleton";

export const LoadingFallback = ({ className, ...props }: SkeletonProps) => {
  return <Skeleton className={cn("p-4 rounded-md", className)} {...props} />;
};
