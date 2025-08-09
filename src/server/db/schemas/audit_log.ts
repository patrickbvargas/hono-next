import { mainSchema } from "./schema";
import { text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const auditActionEnum = mainSchema.enum("audit_action", [
  "create",
  "update",
  "delete",
  "soft_delete",
  "restore",
]);

export const auditLogs = mainSchema.table("audit_logs", {
  id: text("id").primaryKey(),
  tableName: text("table_name").notNull(),
  recordId: text("record_id").notNull(),
  action: auditActionEnum("action").notNull(),
  userId: text("user_id").notNull(),
  oldValues: jsonb("old_values"),
  newValues: jsonb("new_values"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
