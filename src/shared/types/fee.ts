import type { FeeRaw } from "./drizzle";
import type { RevenueType } from "./revenue";
import type { ContractLegalArea } from "./contract";

export type FeeSummary = Pick<FeeRaw, "id" | "value" | "paymentDate"> & {
  contract: string;
  legalArea: ContractLegalArea;
  revenueType: RevenueType;
  client: string;
};

export type FeeSortColumn = keyof FeeSummary;
