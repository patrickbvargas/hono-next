import { employees } from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

type EmployeeTable = InferSelectModel<typeof employees>;

export type Employee = Pick<
  EmployeeTable,
  | "id"
  | "fullName"
  | "oabNumber"
  | "remunerationPercent"
  | "type"
  | "role"
  | "slug"
  | "status"
> & {
  contractCount: number;
};

export type EmployeeType = Employee["type"];
export type EmployeeRole = Employee["role"];
export type EmployeeSortColumn = keyof Employee;
