import { mainSchema } from "./schema";
import { text, timestamp } from "drizzle-orm/pg-core";

export const verifications = mainSchema.table("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});
