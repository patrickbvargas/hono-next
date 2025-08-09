import { text } from "drizzle-orm/pg-core";

export const auditFields = {
  createdBy: text("created_by"),
  updatedBy: text("updated_by"),
  deletedBy: text("deleted_by"),
};