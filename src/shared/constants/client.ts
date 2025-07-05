import type { ClientType, ClientSortColumn } from "../types/client";

export const CLIENT_TYPES = [
  "pf",
  "pj",
] as const satisfies readonly ClientType[];

export const CLIENT_SORT_COLUMNS = [
  "fullName",
  "cnpjf",
  "email",
  "mobilePhone",
  "type",
  "contractCount",
  "status",
] as const satisfies readonly ClientSortColumn[];
