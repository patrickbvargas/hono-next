import type {
  ClientRaw,
  ContractEmployeeRaw,
  ContractRaw,
  EmployeeRaw,
  RemunerationRaw,
  RevenueRaw,
} from "./drizzle";
import type { RevenueType } from "./revenue";
import type { ContractLegalArea } from "./contract";

type RemunerationContractInfo = Pick<
  ContractRaw,
  "identification" | "legalArea"
> & {
  client: Pick<ClientRaw, "fullName">;
};

type RemunerationEmployeeInfo = Pick<ContractEmployeeRaw, "assignment"> & {
  employee: Pick<EmployeeRaw, "fullName">;
};

type RemunerationFeeInfo = {
  revenue: Pick<RevenueRaw, "type">;
};

export type RemunerationSummary = Pick<
  RemunerationRaw,
  "id" | "amount" | "paymentDate" | "percentage"
> & {
  contract: string;
  legalArea: ContractLegalArea;
  revenueType: RevenueType;
  employee: string;
};

export type Remuneration = Pick<
  RemunerationRaw,
  "id" | "amount" | "paymentDate" | "percentage" | "createdAt"
> & {
  contract: RemunerationContractInfo;
  contractEmployee: RemunerationEmployeeInfo;
  fee: RemunerationFeeInfo;
};

export type RemunerationSortColumn = keyof RemunerationSummary;
