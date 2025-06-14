import { revenues } from "./revenue";
import { mainSchema } from "./schema";
import { contracts } from "./contract";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { remunerations } from "./remuneration";
import { integer, text, real, date } from "drizzle-orm/pg-core";

export const fees = mainSchema.table("fees", {
  id: text("id").primaryKey(),
  revenueId: text("revenue_id").notNull(),
  contractId: text("contract_id").notNull(),
  value: real("value").notNull(),
  installmentNumber: integer("installment_number").notNull(),
  paymentDate: date("payment_date").notNull(),
  ...timestamps,
});

export const feesRelations = relations(fees, ({ one, many }) => ({
  contract: one(contracts, {
    fields: [fees.contractId],
    references: [contracts.id],
  }),
  revenue: one(revenues, {
    fields: [fees.revenueId],
    references: [revenues.id],
  }),
  remunerations: many(remunerations),
}));
