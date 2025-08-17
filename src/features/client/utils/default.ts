import type { Client } from "~/shared/types/client";
import type { Filter } from "../schemas/filter";
import type { ClientForm } from "~/shared/schemas/client";

export const getDefaultFilterValues = (): Filter => {
  return {
    type: [],
    status: [],
  };
};

export const getDefaultFormCreateValues = (): ClientForm => {
  return {
    mode: "create",
    id: "",
    fullName: "",
    cnpjf: "",
    email: "",
    mobilePhone: "",
    type: "pf",
  };
};

export const getDefaultFormEditValues = (client: Client): ClientForm => {
  return {
    mode: "edit",
    id: client.id,
    fullName: client.fullName,
    cnpjf: client.cnpjf,
    email: client.email || "",
    mobilePhone: client.mobilePhone || "",
    type: client.type,
  };
};
