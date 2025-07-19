import type { RevenueType } from "./revenue";
import type { RemunerationRaw } from "./drizzle";
import type { ContractLegalArea } from "./contract";

export type RemunerationSummary = Pick<
  RemunerationRaw,
  "id" | "value" | "paymentDate" | "remunerationPercent"
> & {
  contract: string;
  legalArea: ContractLegalArea;
  revenueType: RevenueType;
  employee: string;
};

export type RemunerationSortColumn = keyof RemunerationSummary;
