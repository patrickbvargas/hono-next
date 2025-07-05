import { contracts } from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

type ContractTable = InferSelectModel<typeof contracts>;

export type Contract = Pick<
  ContractTable,
  "id" | "identification" | "feePercent" | "legalArea" | "slug" | "status"
> & {
  client: string;
  lawyer: string;
};

export type ContractLegalArea = Contract["legalArea"];
export type ContractSortColumn = keyof Contract;
