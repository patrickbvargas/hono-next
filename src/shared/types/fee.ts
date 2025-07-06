import { fees } from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";
import type { RevenueType } from "./revenue";
import type { ContractLegalArea } from "./contract";

type FeeTable = InferSelectModel<typeof fees>;

export type FeeSummary = Pick<FeeTable, "id" | "value" | "paymentDate"> & {
  contract: string;
  legalArea: ContractLegalArea;
  revenueType: RevenueType;
  client: string;
};

export type FeeSortColumn = keyof FeeSummary;
