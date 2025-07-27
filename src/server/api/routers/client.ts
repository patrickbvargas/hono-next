import type {
  QueryFields,
  QueryManyReturnType,
  QueryOneReturnType,
} from "../types/query";
import {
  zPaginationParser,
  zSearchParser,
} from "~/shared/schemas/query-parser";
import { z } from "zod/v4";
import { TRPCError } from "@trpc/server";
import { clients } from "~/server/db/schemas";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import type { Client, ClientSummary } from "~/shared/types/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { and, eq, inArray, count, ilike, desc, SQL } from "drizzle-orm";
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

export type QueryOneParams = z.infer<typeof zQueryOneParams>;
export type QueryManyParams = z.infer<typeof zQueryManyParams>;

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
    ? desc(queryManyFields[column])
    : queryManyFields[column];
}

const queryManyFields = {
  id: clients.id,
  fullName: clients.fullName,
  cnpjf: clients.cnpjf,
  email: clients.email,
  type: clients.type,
  status: clients.status,
  contractCount: clients.contractCount,
} satisfies QueryFields<ClientSummary>;

export const clientRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(zQueryOneParams)
    .query(
      async ({
        ctx: { db },
        input: { id },
      }): Promise<QueryOneReturnType<Client>> => {
        const data = await db.query.clients.findFirst({
          columns: {
            id: true,
            fullName: true,
            cnpjf: true,
            email: true,
            mobilePhone: true,
            type: true,
            status: true,
            createdAt: true,
            contractCount: true,
          },
          where: eq(clients.id, id),
        });

        if (!data) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Client not found",
          });
        }

        return data;
      },
    ),

  getMany: publicProcedure
    .input(zQueryManyParams)
    .query(
      async ({
        ctx: { db },
        input: { query, page, limit, column, direction, type, status },
      }): Promise<QueryManyReturnType<ClientSummary>> => {
        const offset = (page - 1) * limit;
        const sortBy = getSort({ column, direction });
        const filters = getFilters({ query, type, status });

        const [rawCount, rawData] = await Promise.all([
          db.select({ count: count() }).from(clients).where(filters),
          db
            .select(queryManyFields)
            .from(clients)
            .where(filters)
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
