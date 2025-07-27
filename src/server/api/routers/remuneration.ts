import type {
  QueryFields,
  QueryManyReturnType,
  QueryOneReturnType,
} from "../types/query";
import {
  contractEmployees,
  contracts,
  employees,
  fees,
  remunerations,
  revenues,
} from "~/server/db/schemas";
import {
  zPaginationParser,
  zSearchParser,
} from "~/shared/schemas/query-parser";
import type {
  Remuneration,
  RemunerationSummary,
} from "~/shared/types/remuneration";
import { z } from "zod/v4";
import { TRPCError } from "@trpc/server";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { REVENUE_TYPES } from "~/shared/constants/revenue";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants/contract";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { REMUNERATION_SORT_COLUMNS } from "~/shared/constants/remuneration";
import { and, eq, inArray, count, ilike, or, desc, SQL } from "drizzle-orm";

const zQueryOneParams = z.object({
  id: z.string(),
});

const zQueryManyParams = z.object({
  ...zSearchParser.shape,
  ...zPaginationParser.shape,
  column: z.enum(REMUNERATION_SORT_COLUMNS),
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
        ilike(employees.fullName, `%${query}%`),
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
    fees: eq(fees.id, remunerations.feeId),
    revenues: eq(revenues.id, fees.revenueId),
    contractEmployees: eq(
      contractEmployees.id,
      remunerations.contractEmployeeId,
    ),
    contracts: eq(contracts.id, contractEmployees.contractId),
    employees: eq(employees.id, contractEmployees.employeeId),
  };
}

const queryManyFields = {
  id: remunerations.id,
  paymentDate: remunerations.paymentDate,
  value: remunerations.value,
  remunerationPercent: remunerations.remunerationPercent,
  contract: contracts.identification,
  legalArea: contracts.legalArea,
  revenueType: revenues.type,
  employee: employees.fullName,
} satisfies QueryFields<RemunerationSummary>;

export const remunerationRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(zQueryOneParams)
    .query(
      async ({
        ctx: { db },
        input: { id },
      }): Promise<QueryOneReturnType<Remuneration>> => {
        const data = await db.query.remunerations.findFirst({
          columns: {
            id: true,
            value: true,
            remunerationPercent: true,
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
            fee: {
              columns: {},
              with: {
                revenue: {
                  columns: {
                    type: true,
                  },
                },
              },
            },
          },
          where: eq(remunerations.id, id),
        });

        if (!data) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Remuneration not found",
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
      }): Promise<QueryManyReturnType<RemunerationSummary>> => {
        const offset = (page - 1) * limit;
        const joinRules = getJoinRules();
        const sortBy = getSort({ column, direction });
        const filters = getFilters({ query, legalArea, revenueType });

        const [rawCount, rawData] = await Promise.all([
          db
            .select({ count: count() })
            .from(remunerations)
            .innerJoin(fees, joinRules.fees)
            .innerJoin(revenues, joinRules.revenues)
            .innerJoin(contractEmployees, joinRules.contractEmployees)
            .innerJoin(contracts, joinRules.contracts)
            .innerJoin(employees, joinRules.employees)
            .where(filters),
          db
            .select(queryManyFields)
            .from(remunerations)
            .innerJoin(fees, joinRules.fees)
            .innerJoin(revenues, joinRules.revenues)
            .innerJoin(contractEmployees, joinRules.contractEmployees)
            .innerJoin(contracts, joinRules.contracts)
            .innerJoin(employees, joinRules.employees)
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
