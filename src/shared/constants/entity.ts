import type { EntityStatus } from "../types/drizzle";

export const ENTITY_STATUS = [
  "active",
  "inactive",
] as const satisfies readonly EntityStatus[];
