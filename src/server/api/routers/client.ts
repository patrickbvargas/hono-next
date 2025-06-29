import {
  zPaginationParser,
  zSearchParser,
} from "~/shared/schemas/query-parser";
import { z } from "zod/v4";
import { TRPCError } from "@trpc/server";
import type { Client } from "~/shared/types/client";
import { clients, contracts } from "~/server/db/schemas";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { and, eq, sql, inArray, count, ilike, or, desc } from "drizzle-orm";
import { CLIENT_TYPES, CLIENT_SORT_COLUMNS } from "~/shared/constants/client";

const zQueryOneParams = z.object({
  slug: z.string(),
});

const zQueryManyParams = zSearchParser.merge(zPaginationParser).merge(
  z.object({
    column: z.enum(CLIENT_SORT_COLUMNS),
    direction: z.enum(SORT_DIRECTIONS),
    type: z.enum(CLIENT_TYPES).array(),
  }),
);

export type QueryManyParams = z.infer<typeof zQueryManyParams>;
export type QueryOneParams = z.infer<typeof zQueryOneParams>;

const clientFields: Record<keyof Client, any> = {
  id: clients.id,
  fullName: clients.fullName,
  cnpjf: clients.cnpjf,
  email: clients.email,
  mobilePhone: clients.mobilePhone,
  type: clients.type,
  slug: clients.slug,
  status: clients.status,
  contractCount: sql<number>`count(${contracts.id})`,
};

export const clientRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(zQueryOneParams)
    .query(async ({ ctx: { db }, input: { slug } }): Promise<Client> => {
      const data = await db
        .select(clientFields)
        .from(clients)
        .leftJoin(contracts, eq(contracts.clientId, clients.id))
        .where(eq(clients.slug, slug))
        .groupBy(clients.id);

      if (!data[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Client not found",
        });
      }

      return data[0];
    }),

  getMany: publicProcedure
    .input(zQueryManyParams)
    .query(
      async ({
        ctx: { db },
        input: { query, page, limit, column, direction, type },
      }): Promise<{ count: number; data: Client[] }> => {
        const sort =
          direction === "descending"
            ? desc(clientFields[column])
            : clientFields[column];

        const offset = (page - 1) * limit;

        const filters = and(
          ilike(clients.fullName, `%${query}%`),
          type.length > 0 ? inArray(clients.type, type) : undefined,
        );

        const [rawCount, rawData] = await Promise.all([
          db.select({ count: count() }).from(clients).where(filters),
          db
            .select(clientFields)
            .from(clients)
            .leftJoin(contracts, eq(contracts.clientId, clients.id))
            .where(filters)
            .groupBy(clients.id)
            .orderBy(sort)
            .limit(limit)
            .offset(offset),
        ]);

        return {
          count: rawCount[0]?.count ?? 0,
          data: rawData,
        };
      },
    ),
});
