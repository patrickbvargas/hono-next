import { remunerations } from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";
import type { RevenueType } from "./revenue";
import type { ContractLegalArea } from "./contract";

type RemunerationTable = InferSelectModel<typeof remunerations>;

export type Remuneration = Pick<
  RemunerationTable,
  "id" | "value" | "paymentDate" | "remunerationPercent"
> & {
  contract: string;
  legalArea: ContractLegalArea;
  revenueType: RevenueType;
  employee: string;
};

export type RemunerationSortColumn = keyof Remuneration;
