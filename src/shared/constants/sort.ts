import type { SortDescriptor } from "@heroui/table";

export const SORT_DIRECTIONS = [
  "ascending",
  "descending",
] as const satisfies readonly SortDescriptor["direction"][];
