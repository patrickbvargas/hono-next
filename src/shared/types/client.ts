import { clients } from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

type ClientTable = InferSelectModel<typeof clients>;

type ContractCount = { contractCount: number };

export type ClientSummary = Pick<
  ClientTable,
  "id" | "fullName" | "cnpjf" | "email" | "type" | "status"
> &
  ContractCount;

export type Client = Pick<
  ClientTable,
  | "id"
  | "fullName"
  | "cnpjf"
  | "email"
  | "mobilePhone"
  | "type"
  | "status"
  | "createdAt"
> &
  ContractCount;

export type ClientType = ClientSummary["type"];
export type ClientSortColumn = keyof ClientSummary;
