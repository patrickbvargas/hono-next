import type { RevenueType } from "../types/revenue";

export const REVENUE_TYPES = [
  "administrative",
  "judicial",
  "compliance",
] as const satisfies readonly RevenueType[];
