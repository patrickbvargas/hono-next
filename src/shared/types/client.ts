import { clients } from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

type ClientTable = InferSelectModel<typeof clients>;

export type Client = Pick<
  ClientTable,
  | "id"
  | "fullName"
  | "cnpjf"
  | "email"
  | "mobilePhone"
  | "type"
  | "slug"
  | "status"
> & {
  contractCount: number;
};

export type ClientType = Client["type"];
export type ClientSortColumn = keyof Client;
