import {
  zPaginationParser,
  zSearchParser,
} from "~/shared/schemas/query-parser";
import { z } from "zod/v4";
import type { Fee } from "~/shared/types/fee";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { FEE_SORT_COLUMNS } from "~/shared/constants/fee";
import { REVENUE_TYPES } from "~/shared/constants/revenue";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants/contract";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clients, contracts, fees, revenues } from "~/server/db/schemas";
import { and, eq, inArray, count, ilike, or, desc, SQL } from "drizzle-orm";

const zQueryOneParams = z.object({
  slug: z.string(),
});

const zQueryManyParams = z.object({
  ...zSearchParser.shape,
  ...zPaginationParser.shape,
  column: z.enum(FEE_SORT_COLUMNS),
  direction: z.enum(SORT_DIRECTIONS),
  legalArea: z.enum(CONTRACT_LEGAL_AREAS).array(),
  revenueType: z.enum(REVENUE_TYPES).array(),
});

export type QueryManyParams = z.infer<typeof zQueryManyParams>;
export type QueryOneParams = z.infer<typeof zQueryOneParams>;

const feeFields: Record<keyof Fee, any> = {
  id: fees.id,
  paymentDate: fees.paymentDate,
  value: fees.value,
  client: clients.fullName,
  contract: contracts.identification,
  legalArea: contracts.legalArea,
  revenueType: revenues.type,
};

export const feeRouter = createTRPCRouter({
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
      }): Promise<{ count: number; data: Fee[] }> => {
        const sort =
          direction === "descending"
            ? desc(feeFields[column])
            : feeFields[column];

        const offset = (page - 1) * limit;

        const joinConditions = {
          revenues: eq(revenues.id, fees.revenueId),
          contracts: eq(contracts.id, revenues.contractId),
          clients: eq(clients.id, contracts.clientId),
        };

        const filters = (() => {
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

          if (revenueType.length > 0)
            filters.push(inArray(revenues.type, revenueType));

          return filters.length > 0 ? and(...filters) : undefined;
        })();

        const [rawCount, rawData] = await Promise.all([
          db
            .select({ count: count() })
            .from(fees)
            .innerJoin(revenues, joinConditions.revenues)
            .innerJoin(contracts, joinConditions.contracts)
            .innerJoin(clients, joinConditions.clients)
            .where(filters),
          db
            .select(feeFields)
            .from(fees)
            .innerJoin(revenues, joinConditions.revenues)
            .innerJoin(contracts, joinConditions.contracts)
            .innerJoin(clients, joinConditions.clients)
            .where(filters)
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
