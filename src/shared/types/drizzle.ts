import { entityStatusEnum } from "~/server/db/schemas";

export type EntityStatus = (typeof entityStatusEnum.enumValues)[number];
