import type { ContractLegalArea, ContractSortColumn } from "../types/contract";

export const CONTRACT_LEGAL_AREAS = [
  "civil",
  "family",
  "labor",
  "other",
  "social_security",
] as const satisfies readonly ContractLegalArea[];

export const CONTRACT_SORT_COLUMNS = [
  "identification",
  "client",
  "lawyer",
  "feePercent",
  "legalArea",
  "status",
] as const satisfies readonly ContractSortColumn[];
