import { status } from "./status";
import { mainSchema } from "./schema";
import { auditFields } from "./audit";
import { contracts } from "./contract";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { text, integer } from "drizzle-orm/pg-core";

export const clientTypeEnum = mainSchema.enum("client_type", ["pf", "pj"]);

export const clients = mainSchema.table("clients", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  cnpjf: text("cnpjf").notNull().unique(),
  email: text("email"),
  mobilePhone: text("mobile_phone"),
  type: clientTypeEnum("type").notNull(),
  contractCount: integer("contract_count"),
  ...status,
  ...timestamps,
  ...auditFields,
});

export const clientsRelations = relations(clients, ({ many }) => ({
  contracts: many(contracts),
}));
