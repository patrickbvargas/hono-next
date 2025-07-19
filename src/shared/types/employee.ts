import { employees } from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

type EmployeeTable = InferSelectModel<typeof employees>;

type ContractCount = { contractCount: number };

export type EmployeeSummary = Pick<
  EmployeeTable,
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
  EmployeeTable,
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

export type EmployeeType = EmployeeSummary["type"];
export type EmployeeRole = EmployeeSummary["role"];
export type EmployeeSortColumn = keyof EmployeeSummary;
