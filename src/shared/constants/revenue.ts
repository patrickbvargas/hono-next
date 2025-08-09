import type { RevenueType } from "../types/revenue";

export const REVENUE_TYPES = [
  "administrative",
  "judicial",
  "succumbency",
] as const satisfies readonly RevenueType[];
