import type { InferSelectModel } from "drizzle-orm";
import type { employees } from "~/server/db/schemas";

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
