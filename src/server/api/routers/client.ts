import {
  zPaginationParser,
  zSearchParser,
} from "~/shared/schemas/query-parser";
import { z } from "zod/v4";
import { clients, contracts } from "~/server/db/schemas";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import type { ClientSummary } from "~/shared/types/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { QueryManyFields, QueryManyReturnType } from "../types/query";
import { and, eq, sql, inArray, count, ilike, desc, SQL } from "drizzle-orm";
import { CLIENT_TYPES, CLIENT_SORT_COLUMNS } from "~/shared/constants/client";

const zQueryOneParams = z.object({
  id: z.string(),
});

const zQueryManyParams = z.object({
  ...zSearchParser.shape,
  ...zPaginationParser.shape,
  column: z.enum(CLIENT_SORT_COLUMNS),
  direction: z.enum(SORT_DIRECTIONS),
  type: z.enum(CLIENT_TYPES).array(),
  status: z.enum(ENTITY_STATUS).array(),
});

export type QueryManyParams = z.infer<typeof zQueryManyParams>;
export type QueryOneParams = z.infer<typeof zQueryOneParams>;

function getFilters({
  query,
  type,
  status,
}: Pick<QueryManyParams, "query" | "type" | "status">) {
  const filters: (SQL | undefined)[] = [];

  if (query) filters.push(ilike(clients.fullName, `%${query}%`));

  if (type.length > 0) filters.push(inArray(clients.type, type));

  if (status.length > 0) filters.push(inArray(clients.status, status));

  return filters.length > 0 ? and(...filters) : undefined;
}

function getSort({
  column,
  direction,
}: Pick<QueryManyParams, "column" | "direction">) {
  return direction === "descending"
    ? desc(selectFields[column])
    : selectFields[column];
}

function getJoinRules() {
  return {
    contracts: eq(contracts.clientId, clients.id),
  };
}

const selectFields = {
  id: clients.id,
  fullName: clients.fullName,
  cnpjf: clients.cnpjf,
  email: clients.email,
  type: clients.type,
  status: clients.status,
  contractCount: sql<number>`count(${contracts.id})`,
} satisfies QueryManyFields<ClientSummary>;

export const clientRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(zQueryManyParams)
    .query(
      async ({
        ctx: { db },
        input: { query, page, limit, column, direction, type, status },
      }): Promise<QueryManyReturnType<ClientSummary>> => {
        const offset = (page - 1) * limit;
        const joinRules = getJoinRules();
        const sortBy = getSort({ column, direction });
        const filters = getFilters({ query, type, status });

        const [rawCount, rawData] = await Promise.all([
          db
            .select({ count: count() })
            .from(clients)
            .leftJoin(contracts, joinRules.contracts)
            .where(filters),
          db
            .select(selectFields)
            .from(clients)
            .leftJoin(contracts, joinRules.contracts)
            .where(filters)
            .groupBy(clients.id)
            .orderBy(sortBy)
            .limit(limit)
            .offset(offset),
        ]);

        return {
          data: rawData,
          count: rawCount[0]?.count ?? 0,
        };
      },
    ),
});
