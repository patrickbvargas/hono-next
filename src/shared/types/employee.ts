import { employees } from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

type EmployeeTable = InferSelectModel<typeof employees>;

export type EmployeeSummary = Pick<
  EmployeeTable,
  | "id"
  | "fullName"
  | "oabNumber"
  | "remunerationPercent"
  | "type"
  | "role"
  | "status"
> & {
  contractCount: number;
};

export type EmployeeType = EmployeeSummary["type"];
export type EmployeeRole = EmployeeSummary["role"];
export type EmployeeSortColumn = keyof EmployeeSummary;
