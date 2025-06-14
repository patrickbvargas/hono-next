import { status } from "./status";
import { mainSchema } from "./schema";
import { contracts } from "./contract";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";
import { text } from "drizzle-orm/pg-core";

export const clientTypeEnum = mainSchema.enum("client_type", ["pf", "pj"]);

export const clients = mainSchema.table("clients", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  cnpjf: text("cnpjf").notNull().unique(),
  email: text("email").notNull(),
  mobilePhone: text("mobile_phone").notNull(),
  type: clientTypeEnum("type").notNull(),
  slug: text("slug").unique().notNull(),
  ...status,
  ...timestamps,
});

export const clientsRelations = relations(clients, ({ many }) => ({
  contracts: many(contracts),
}));
