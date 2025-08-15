import { Skeleton } from "@heroui/skeleton";

// TODO: update the style to sync UI
export const FormSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-4 w-20 rounded-lg" />
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-3 space-y-2">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="col-span-3 space-y-2">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="col-span-2 space-y-2">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="col-span-2 space-y-2">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="col-span-2 space-y-2">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-20 rounded-lg" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 border-t border-divider pt-4">
        <Skeleton className="h-10 w-20 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
};
