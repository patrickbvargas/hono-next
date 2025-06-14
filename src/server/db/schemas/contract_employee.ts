import { mainSchema } from "./schema";
import { contracts } from "./contract";
import { employees } from "./employee";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { text } from "drizzle-orm/pg-core";
import { remunerations } from "./remuneration";

export const employeeAssignmentEnum = mainSchema.enum("employee_assignment", [
  "responsible",
  "recommended",
  "recommending",
  "aditional",
  "admin_assistant",
]);

export const contractEmployees = mainSchema.table("contract_employee", {
  id: text("id").primaryKey(),
  contractId: text("contract_id").notNull(),
  employeeId: text("employee_id").notNull(),
  assignment: employeeAssignmentEnum("assignment").notNull(),
  ...timestamps,
});

export const contractEmployeesRelations = relations(
  contractEmployees,
  ({ one, many }) => ({
    contract: one(contracts, {
      fields: [contractEmployees.contractId],
      references: [contracts.id],
    }),
    employee: one(employees, {
      fields: [contractEmployees.employeeId],
      references: [employees.id],
    }),
    remunerations: many(remunerations),
  }),
);
