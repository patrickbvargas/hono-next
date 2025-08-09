import type { FeeSortColumn } from "../types/fee";

export const FEE_SORT_COLUMNS = [
  "contract",
  "client",
  "revenueType",
  "legalArea",
  "paymentDate",
  "amount",
] as const satisfies readonly FeeSortColumn[];
