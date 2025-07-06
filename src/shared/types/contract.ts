import { contracts } from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

type ContractTable = InferSelectModel<typeof contracts>;

export type ContractSummary = Pick<
  ContractTable,
  "id" | "identification" | "feePercent" | "legalArea" | "status"
> & {
  client: string;
  lawyer: string;
};

export type ContractLegalArea = ContractSummary["legalArea"];
export type ContractSortColumn = keyof ContractSummary;
