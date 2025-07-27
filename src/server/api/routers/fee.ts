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
import type { Fee, FeeSummary } from "~/shared/types/fee";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { FEE_SORT_COLUMNS } from "~/shared/constants/fee";
import { REVENUE_TYPES } from "~/shared/constants/revenue";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants/contract";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clients, contracts, fees, revenues } from "~/server/db/schemas";
import { and, eq, inArray, count, ilike, or, desc, SQL } from "drizzle-orm";

const zQueryOneParams = z.object({
  id: z.string(),
});

const zQueryManyParams = z.object({
  ...zSearchParser.shape,
  ...zPaginationParser.shape,
  column: z.enum(FEE_SORT_COLUMNS),
  direction: z.enum(SORT_DIRECTIONS),
  legalArea: z.enum(CONTRACT_LEGAL_AREAS).array(),
  revenueType: z.enum(REVENUE_TYPES).array(),
});

export type QueryOneParams = z.infer<typeof zQueryOneParams>;
export type QueryManyParams = z.infer<typeof zQueryManyParams>;

function getFilters({
  query,
  legalArea,
  revenueType,
}: Pick<QueryManyParams, "query" | "legalArea" | "revenueType">) {
  const filters: (SQL | undefined)[] = [];

  if (query)
    filters.push(
      or(
        ilike(contracts.identification, `%${query}%`),
        ilike(clients.fullName, `%${query}%`),
      ),
    );

  if (legalArea.length > 0)
    filters.push(inArray(contracts.legalArea, legalArea));

  if (revenueType.length > 0) filters.push(inArray(revenues.type, revenueType));

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

function getJoinRules() {
  return {
    revenues: eq(revenues.id, fees.revenueId),
    contracts: eq(contracts.id, revenues.contractId),
    clients: eq(clients.id, contracts.clientId),
  };
}

const queryManyFields = {
  id: fees.id,
  paymentDate: fees.paymentDate,
  value: fees.value,
  contract: contracts.identification,
  legalArea: contracts.legalArea,
  client: clients.fullName,
  revenueType: revenues.type,
} satisfies QueryFields<FeeSummary>;

export const feeRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(zQueryOneParams)
    .query(
      async ({
        ctx: { db },
        input: { id },
      }): Promise<QueryOneReturnType<Fee>> => {
        const data = await db.query.fees.findFirst({
          columns: {
            id: true,
            value: true,
            installmentNumber: true,
            paymentDate: true,
            createdAt: true,
          },
          with: {
            contract: {
              columns: {
                identification: true,
                legalArea: true,
              },
              with: {
                client: {
                  columns: {
                    fullName: true,
                  },
                },
              },
            },
            revenue: {
              columns: {
                type: true,
              },
            },
            remunerations: {
              columns: {
                remunerationPercent: true,
                value: true,
              },
              with: {
                contractEmployee: {
                  columns: {
                    assignment: true,
                  },
                  with: {
                    employee: {
                      columns: {
                        fullName: true,
                      },
                    },
                  },
                },
              },
            },
          },
          where: eq(fees.id, id),
        });

        if (!data) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Fee not found",
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
        input: {
          query,
          page,
          limit,
          column,
          direction,
          legalArea,
          revenueType,
        },
      }): Promise<QueryManyReturnType<FeeSummary>> => {
        const offset = (page - 1) * limit;
        const joinRules = getJoinRules();
        const sortBy = getSort({ column, direction });
        const filters = getFilters({ query, legalArea, revenueType });

        const [rawCount, rawData] = await Promise.all([
          db
            .select({ count: count() })
            .from(fees)
            .innerJoin(revenues, joinRules.revenues)
            .innerJoin(contracts, joinRules.contracts)
            .innerJoin(clients, joinRules.clients)
            .where(filters),
          db
            .select(queryManyFields)
            .from(fees)
            .innerJoin(revenues, joinRules.revenues)
            .innerJoin(contracts, joinRules.contracts)
            .innerJoin(clients, joinRules.clients)
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
