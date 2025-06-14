import { fees } from "./fee";
import { mainSchema } from "./schema";
import { contracts } from "./contract";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { text, real, date } from "drizzle-orm/pg-core";
import { contractEmployees } from "./contract_employee";

export const remunerations = mainSchema.table("remunerations", {
  id: text("id").primaryKey(),
  feeId: text("fee_id").notNull(),
  contractId: text("contract_id").notNull(),
  contractEmployeeId: text("contract_employee_id").notNull(),
  remunerationPercent: real("remuneration_percentage").notNull(),
  value: real("value").notNull(),
  paymentDate: date("payment_date").notNull(),
  ...timestamps,
});

export const remunerationsRelations = relations(remunerations, ({ one }) => ({
  contract: one(contracts, {
    fields: [remunerations.contractId],
    references: [contracts.id],
  }),
  fee: one(fees, {
    fields: [remunerations.feeId],
    references: [fees.id],
  }),
  contractEmployee: one(contractEmployees, {
    fields: [remunerations.contractEmployeeId],
    references: [contractEmployees.id],
  }),
}));
