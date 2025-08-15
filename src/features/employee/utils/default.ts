import type { Employee } from "~/shared/types/employee";
import type { EmployeeFilter } from "../schemas/filter";
import type { EmployeeForm } from "~/shared/schemas/employee";

export const getDefaultFilterValues = (): EmployeeFilter => {
  return {
    role: [],
    type: [],
    status: [],
  };
};

export const getDefaultFormCreateValues = (): EmployeeForm => {
  return {
    mode: "create",
    id: "",
    fullName: "",
    email: "",
    oabNumber: "",
    remunerationPercent: 0,
    referrerPercent: 0,
    type: "admin_assistant",
    role: "user",
    password: "",
  };
};

export const getDefaultFormEditValues = (employee: Employee): EmployeeForm => {
  return {
    mode: "edit",
    id: employee.id,
    fullName: employee.fullName,
    email: employee.email,
    oabNumber: employee.oabNumber || "",
    remunerationPercent: employee.remunerationPercent,
    referrerPercent: employee.referrerPercent,
    type: employee.type,
    role: employee.role,
  };
};
