import type {
  ClientRaw,
  ContractRaw,
  EmployeeRaw,
  RevenueRaw,
} from "./drizzle";
import type { EmployeeAssignment } from "./employee";

type ContractClientInfo = Pick<ClientRaw, "fullName">;

type ContractEmployeeInfo = {
  assignment: EmployeeAssignment;
  employee: Pick<EmployeeRaw, "fullName">;
};

type ContractRevenueInfo = Pick<
  RevenueRaw,
  | "totalValue"
  | "downPayment"
  | "installmentsTotal"
  | "installmentsPaid"
  | "paymentStartDate"
  | "type"
>;

export type ContractSummary = Pick<
  ContractRaw,
  "id" | "identification" | "feePercent" | "legalArea" | "status"
> & {
  client: string;
  lawyer: string;
};

export type Contract = Pick<
  ContractRaw,
  | "id"
  | "identification"
  | "feePercent"
  | "legalArea"
  | "observation"
  | "status"
  | "createdAt"
> & {
  client: ContractClientInfo;
  employees: ContractEmployeeInfo[];
  revenues: ContractRevenueInfo[];
};

export type ContractLegalArea = ContractRaw["legalArea"];
export type ContractSortColumn = keyof ContractSummary;
