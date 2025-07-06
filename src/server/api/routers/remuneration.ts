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
import { z } from "zod/v4";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { REVENUE_TYPES } from "~/shared/constants/revenue";
import type { Remuneration } from "~/shared/types/remuneration";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants/contract";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { REMUNERATION_SORT_COLUMNS } from "~/shared/constants/remuneration";
import { and, eq, inArray, count, ilike, or, desc, SQL } from "drizzle-orm";

const zQueryOneParams = z.object({
  slug: z.string(),
});

const zQueryManyParams = z.object({
  ...zSearchParser.shape,
  ...zPaginationParser.shape,
  column: z.enum(REMUNERATION_SORT_COLUMNS),
  direction: z.enum(SORT_DIRECTIONS),
  legalArea: z.enum(CONTRACT_LEGAL_AREAS).array(),
  revenueType: z.enum(REVENUE_TYPES).array(),
});

export type QueryManyParams = z.infer<typeof zQueryManyParams>;
export type QueryOneParams = z.infer<typeof zQueryOneParams>;

const remunerationFields: Record<keyof Remuneration, any> = {
  id: remunerations.id,
  paymentDate: remunerations.paymentDate,
  value: remunerations.value,
  remunerationPercent: remunerations.remunerationPercent,
  contract: contracts.identification,
  legalArea: contracts.legalArea,
  revenueType: revenues.type,
  employee: employees.fullName,
};

export const remunerationRouter = createTRPCRouter({
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
      }): Promise<{ count: number; data: Remuneration[] }> => {
        const sort =
          direction === "descending"
            ? desc(remunerationFields[column])
            : remunerationFields[column];

        const offset = (page - 1) * limit;

        const joinConditions = {
          fees: eq(fees.id, remunerations.feeId),
          revenues: eq(revenues.id, fees.revenueId),
          contractEmployees: eq(
            contractEmployees.id,
            remunerations.contractEmployeeId,
          ),
          contracts: eq(contracts.id, contractEmployees.contractId),
          employees: eq(employees.id, contractEmployees.employeeId),
        };

        const filters = (() => {
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

          if (revenueType.length > 0)
            filters.push(inArray(revenues.type, revenueType));

          return filters.length > 0 ? and(...filters) : undefined;
        })();

        const [rawCount, rawData] = await Promise.all([
          db
            .select({ count: count() })
            .from(remunerations)
            .innerJoin(fees, joinConditions.fees)
            .innerJoin(revenues, joinConditions.revenues)
            .innerJoin(contractEmployees, joinConditions.contractEmployees)
            .innerJoin(contracts, joinConditions.contracts)
            .innerJoin(employees, joinConditions.employees)
            .where(filters),
          db
            .select(remunerationFields)
            .from(remunerations)
            .innerJoin(fees, joinConditions.fees)
            .innerJoin(revenues, joinConditions.revenues)
            .innerJoin(contractEmployees, joinConditions.contractEmployees)
            .innerJoin(contracts, joinConditions.contracts)
            .innerJoin(employees, joinConditions.employees)
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
