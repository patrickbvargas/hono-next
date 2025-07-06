import { clients } from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

type ClientTable = InferSelectModel<typeof clients>;

export type ClientSummary = Pick<
  ClientTable,
  "id" | "fullName" | "cnpjf" | "email" | "type" | "status"
> & {
  contractCount: number;
};

export type ClientType = ClientSummary["type"];
export type ClientSortColumn = keyof ClientSummary;
