import type { RemunerationSortColumn } from "../types/remuneration";

export const REMUNERATION_SORT_COLUMNS = [
  "contract",
  "revenueType",
  "legalArea",
  "employee",
  "paymentDate",
  "value",
  "remunerationPercent",
] as const satisfies readonly RemunerationSortColumn[];
