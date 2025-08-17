import { EntityPanelTitle } from "~/shared/components/entity-panel";
import { Skeleton } from "~/shared/components/ui/skeleton";

export const DetailSkeleton = () => {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-divider p-6">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <EntityPanelTitle>Remover futuramente</EntityPanelTitle>
      </div>

      {/* Body */}
      <div className="flex-1 p-6">
        <div className="space-y-4">
          {/* Accordion Section 1 - General Info */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-40 rounded-lg" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-4 w-36 rounded-lg" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12 rounded-lg" />
                <Skeleton className="h-4 w-24 rounded-lg" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16 rounded-lg" />
                <Skeleton className="h-4 w-32 rounded-lg" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-4 w-28 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Accordion Section 2 - Financial */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-24 rounded-lg" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-4 w-16 rounded-lg" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-4 w-24 rounded-lg" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Accordion Section 3 - Register */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-20 rounded-lg" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-4 w-32 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-divider p-6">
        <div className="flex justify-end gap-2">
          <Skeleton className="h-10 w-20 rounded-lg" />
          <Skeleton className="h-10 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
