import { mainSchema } from "./schema";
import { text, timestamp } from "drizzle-orm/pg-core";

export const sessions = mainSchema.table("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
});
