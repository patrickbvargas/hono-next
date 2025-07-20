import {
  clients,
  contractEmployees,
  contracts,
  employees,
  entityStatusEnum,
  fees,
  remunerations,
  revenues,
} from "~/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

export type ClientRaw = InferSelectModel<typeof clients>;
export type ContractRaw = InferSelectModel<typeof contracts>;
export type ContractEmployeeRaw = InferSelectModel<typeof contractEmployees>;
export type EmployeeRaw = InferSelectModel<typeof employees>;
export type FeeRaw = InferSelectModel<typeof fees>;
export type RemunerationRaw = InferSelectModel<typeof remunerations>;
export type RevenueRaw = InferSelectModel<typeof revenues>;

export type EntityStatus = (typeof entityStatusEnum.enumValues)[number];
