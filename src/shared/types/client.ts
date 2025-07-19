import type { ClientRaw } from "./drizzle";

type ContractCount = { contractCount: number };

export type ClientSummary = Pick<
  ClientRaw,
  "id" | "fullName" | "cnpjf" | "email" | "type" | "status"
> &
  ContractCount;

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
> &
  ContractCount;

export type ClientType = ClientRaw["type"];
export type ClientSortColumn = keyof ClientSummary;
