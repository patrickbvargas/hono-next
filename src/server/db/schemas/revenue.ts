import { fees } from "./fee";
import { mainSchema } from "./schema";
import { contracts } from "./contract";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { text, integer, real, date } from "drizzle-orm/pg-core";

export const revenueTypeEnum = mainSchema.enum("revenue_type", [
  "administrative",
  "judicial",
  "compliance",
]);

export const revenues = mainSchema.table("revenues", {
  id: text("id").primaryKey(),
  contractId: text("contract_id").notNull(),
  amount: real("amount").notNull(),
  entryValue: real("entry_value").notNull(),
  installmentsTotal: integer("installments_total").notNull(),
  installmentsPaid: integer("installments_paid").notNull(),
  paymentStartDate: date("payment_start_date").notNull(),
  type: revenueTypeEnum("type").notNull(),
  ...timestamps,
});

export const revenuesRelations = relations(revenues, ({ one, many }) => ({
  contract: one(contracts, {
    fields: [revenues.contractId],
    references: [contracts.id],
  }),
  fees: many(fees),
}));
