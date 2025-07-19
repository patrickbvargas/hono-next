import type { EmployeeContractRaw, EmployeeRaw } from "./drizzle";

type ContractCount = { contractCount: number };

export type EmployeeSummary = Pick<
  EmployeeRaw,
  | "id"
  | "fullName"
  | "oabNumber"
  | "remunerationPercent"
  | "type"
  | "role"
  | "status"
> &
  ContractCount;

export type Employee = Pick<
  EmployeeRaw,
  | "id"
  | "fullName"
  | "oabNumber"
  | "remunerationPercent"
  | "type"
  | "role"
  | "status"
  | "createdAt"
> &
  ContractCount;

export type EmployeeType = EmployeeRaw["type"];
export type EmployeeRole = EmployeeRaw["role"];
export type EmployeeAssignment = EmployeeContractRaw["assignment"];
export type EmployeeSortColumn = keyof EmployeeSummary;
