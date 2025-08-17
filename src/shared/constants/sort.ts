import type { SortDescriptor } from "~/shared/types/sort";

export const SORT_DIRECTIONS = [
  "ascending",
  "descending",
] as const satisfies readonly SortDescriptor["direction"][];
