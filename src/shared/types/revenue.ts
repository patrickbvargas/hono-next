import { revenues } from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

type RevenueTable = InferSelectModel<typeof revenues>;

export type RevenueType = RevenueTable["type"];
