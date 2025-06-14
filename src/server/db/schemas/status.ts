import { mainSchema } from "./schema";

export const entityStatusEnum = mainSchema.enum("entity_status", [
  "active",
  "inactive",
]);

export const status = {
  status: entityStatusEnum("status").notNull().default("active"),
};
