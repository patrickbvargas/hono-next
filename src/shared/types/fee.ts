import type {
  ClientRaw,
  ContractEmployeeRaw,
  ContractRaw,
  EmployeeRaw,
  FeeRaw,
  RemunerationRaw,
  RevenueRaw,
} from "./drizzle";
import type { RevenueType } from "./revenue";
import type { ContractLegalArea } from "./contract";

type FeeContractInfo = Pick<ContractRaw, "identification" | "legalArea"> & {
  client: Pick<ClientRaw, "fullName">;
};

type FeeRevenueInfo = Pick<RevenueRaw, "type">;

type FeeRemunerationInfo = Pick<RemunerationRaw, "percentage" | "amount"> & {
  contractEmployee: Pick<ContractEmployeeRaw, "assignment"> & {
    employee: Pick<EmployeeRaw, "fullName">;
  };
};

export type FeeSummary = Pick<FeeRaw, "id" | "amount" | "paymentDate"> & {
  contract: string;
  legalArea: ContractLegalArea;
  revenueType: RevenueType;
  client: string;
};

export type Fee = Pick<
  FeeRaw,
  "id" | "amount" | "installmentNumber" | "paymentDate" | "createdAt"
> & {
  contract: FeeContractInfo;
  revenue: FeeRevenueInfo;
  remunerations: FeeRemunerationInfo[];
};

export type FeeSortColumn = keyof FeeSummary;
