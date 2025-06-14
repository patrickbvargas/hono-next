import { fees } from "./fee";
import { status } from "./status";
import { clients } from "./client";
import { revenues } from "./revenue";
import { mainSchema } from "./schema";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { remunerations } from "./remuneration";
import { text, real } from "drizzle-orm/pg-core";
import { contractEmployees } from "./contract_employee";

export const contractLegalAreaEnum = mainSchema.enum("contract_legal_area", [
  "social_security",
  "civil",
  "family",
  "labor",
  "other",
]);

export const contracts = mainSchema.table("contracts", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull(),
  identification: text("identification").unique().notNull(),
  feePercent: real("fee_percent").notNull(),
  observation: text("observation"),
  legalArea: contractLegalAreaEnum("legal_area").notNull(),
  slug: text("slug").unique().notNull(),
  ...status,
  ...timestamps,
});

export const contractsRelations = relations(contracts, ({ one, many }) => ({
  client: one(clients, {
    fields: [contracts.clientId],
    references: [clients.id],
  }),
  employees: many(contractEmployees),
  revenues: many(revenues),
  fees: many(fees),
  remunerations: many(remunerations),
}));
