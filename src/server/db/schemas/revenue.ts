import { fees } from "./fee";
import { mainSchema } from "./schema";
import { auditFields } from "./audit";
import { contracts } from "./contract";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { text, integer, real, date } from "drizzle-orm/pg-core";

export const revenueTypeEnum = mainSchema.enum("revenue_type", [
  "administrative",
  "judicial",
  "succumbency",
]);

export const revenues = mainSchema.table("revenues", {
  id: text("id").primaryKey(),
  contractId: text("contract_id").notNull(),
  totalValue: real("total_value").notNull(),
  downPayment: real("down_payment").default(0).notNull(),
  installmentsTotal: integer("installments_total").notNull(),
  installmentsPaid: integer("installments_paid").default(0).notNull(),
  paymentStartDate: date("payment_start_date").notNull(),
  type: revenueTypeEnum("type").notNull(),
  ...timestamps,
  ...auditFields,
});

export const revenuesRelations = relations(revenues, ({ one, many }) => ({
  contract: one(contracts, {
    fields: [revenues.contractId],
    references: [contracts.id],
  }),
  fees: many(fees),
}));
