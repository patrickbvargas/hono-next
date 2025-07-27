import type { ContractEmployeeRaw, EmployeeRaw } from "./drizzle";

export type EmployeeSummary = Pick<
  EmployeeRaw,
  | "id"
  | "fullName"
  | "oabNumber"
  | "remunerationPercent"
  | "type"
  | "role"
  | "status"
  | "contractCount"
>;

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
  | "contractCount"
>;

export type EmployeeType = EmployeeRaw["type"];
export type EmployeeRole = EmployeeRaw["role"];
export type EmployeeAssignment = ContractEmployeeRaw["assignment"];
export type EmployeeSortColumn = keyof EmployeeSummary;
