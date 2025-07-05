import type {
  EmployeeRole,
  EmployeeSortColumn,
  EmployeeType,
} from "../types/employee";

export const EMPLOYEE_TYPES = [
  "lawyer",
  "admin_assistant",
] as const satisfies readonly EmployeeType[];

export const EMPLOYEE_ROLES = [
  "user",
  "admin",
] as const satisfies readonly EmployeeRole[];

export const EMPLOYEE_SORT_COLUMNS = [
  "fullName",
  "oabNumber",
  "remunerationPercent",
  "role",
  "type",
  "contractCount",
  "status",
] as const satisfies readonly EmployeeSortColumn[];
