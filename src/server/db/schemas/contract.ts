import { fees } from "./fee";
import { status } from "./status";
import { clients } from "./client";
import { revenues } from "./revenue";
import { mainSchema } from "./schema";
import { auditFields } from "./audit";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { remunerations } from "./remuneration";
import { text, real, boolean } from "drizzle-orm/pg-core";
import { contractEmployees } from "./contract_employee";

export const contractLegalAreaEnum = mainSchema.enum("contract_legal_area", [
  "civil",
  "family",
  "other",
  "social_security",
  "labor",
]);

export const contractStatusEnum = mainSchema.enum("contract_status", [
  "active",
  "completed",
  "cancelled",
]);

export const contracts = mainSchema.table("contracts", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull(),
  identification: text("identification").unique().notNull(),
  feePercent: real("fee_percent").notNull(),
  observation: text("observation"),
  legalArea: contractLegalAreaEnum("legal_area").notNull(),
  contractStatus: contractStatusEnum("contract_status")
    .default("active")
    .notNull(),
  allowStatusChange: boolean("allow_status_change").default(true),
  ...status,
  ...timestamps,
  ...auditFields,
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
