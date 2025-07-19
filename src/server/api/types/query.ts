import type { SQL } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";

export type QueryFields<T> = {
  [K in keyof T]: PgColumn | SQL;
};

export type QueryManyReturnType<T> = {
  data: T[];
  count: number;
};

export type QueryOneReturnType<T> = T;
