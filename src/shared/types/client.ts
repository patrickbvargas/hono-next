import type { ClientRaw } from "./drizzle";

export type ClientSummary = Pick<
  ClientRaw,
  "id" | "fullName" | "cnpjf" | "email" | "type" | "status" | "contractCount"
>;

export type Client = Pick<
  ClientRaw,
  | "id"
  | "fullName"
  | "cnpjf"
  | "email"
  | "mobilePhone"
  | "type"
  | "status"
  | "createdAt"
  | "contractCount"
>;

export type ClientType = ClientRaw["type"];
export type ClientSortColumn = keyof ClientSummary;
