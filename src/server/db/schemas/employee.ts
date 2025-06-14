import { status } from "./status";
import { mainSchema } from "./schema";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { text, real } from "drizzle-orm/pg-core";
import { contractEmployees } from "./contract_employee";

export const employeeTypeEnum = mainSchema.enum("employee_type", [
  "lawyer",
  "admin_assistant",
]);

export const employeeRoleEnum = mainSchema.enum("employee_role", [
  "user",
  "admin",
]);

export const employees = mainSchema.table("employees", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  oabNumber: text("oab_number").unique(),
  remunerationPercent: real("remuneration_percent").notNull(),
  type: employeeTypeEnum("type").notNull(),
  role: employeeRoleEnum("role").default("user").notNull(),
  slug: text("slug").unique().notNull(),
  ...status,
  ...timestamps,
});

export const employeesRelations = relations(employees, ({ many }) => ({
  contracts: many(contractEmployees),
}));
