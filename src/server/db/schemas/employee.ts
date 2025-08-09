import { status } from "./status";
import { mainSchema } from "./schema";
import { auditFields } from "./audit";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { contractEmployees } from "./contract_employee";
import { text, real, integer } from "drizzle-orm/pg-core";

export const employeeTypeEnum = mainSchema.enum("employee_type", [
  "lawyer",
  "admin_assistant",
]);

export const employeeRoleEnum = mainSchema.enum("employee_role", [
  "admin",
  "user",
]);

export const employees = mainSchema.table("employees", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  oabNumber: text("oab_number").unique(),
  remunerationPercent: real("remuneration_percent").notNull(),
  referrerPercent: real("referrer_percent").notNull(),
  type: employeeTypeEnum("type").notNull(),
  role: employeeRoleEnum("role").default("user").notNull(),
  password: text("password").notNull(),
  image: text("image"),
  contractCount: integer("contract_count").notNull(),
  ...status,
  ...timestamps,
  ...auditFields,
});

export const employeesRelations = relations(employees, ({ many }) => ({
  contracts: many(contractEmployees),
}));
