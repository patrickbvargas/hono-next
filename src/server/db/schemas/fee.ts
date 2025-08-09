import { revenues } from "./revenue";
import { mainSchema } from "./schema";
import { auditFields } from "./audit";
import { contracts } from "./contract";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { remunerations } from "./remuneration";
import { integer, text, real, date, boolean } from "drizzle-orm/pg-core";

export const fees = mainSchema.table("fees", {
  id: text("id").primaryKey(),
  revenueId: text("revenue_id").notNull(),
  contractId: text("contract_id").notNull(),
  amount: real("amount").notNull(),
  installmentNumber: integer("installment_number").notNull(),
  paymentDate: date("payment_date").notNull(),
  generateRemuneration: boolean("generate_remuneration")
    .default(true)
    .notNull(),
  ...timestamps,
  ...auditFields,
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
