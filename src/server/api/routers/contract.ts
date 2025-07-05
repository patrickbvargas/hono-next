import {
  clients,
  contracts,
  employees,
  contractEmployees,
} from "~/server/db/schemas";
import {
  CONTRACT_LEGAL_AREAS,
  CONTRACT_SORT_COLUMNS,
} from "~/shared/constants/contract";
import {
  zPaginationParser,
  zSearchParser,
} from "~/shared/schemas/query-parser";
import { z } from "zod/v4";
import { TRPCError } from "@trpc/server";
import type { Contract } from "~/shared/types/contract";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { and, eq, inArray, count, ilike, or, desc, SQL } from "drizzle-orm";

const zQueryOneParams = z.object({
  slug: z.string(),
});

const zQueryManyParams = z.object({
  ...zSearchParser.shape,
  ...zPaginationParser.shape,
  column: z.enum(CONTRACT_SORT_COLUMNS),
  direction: z.enum(SORT_DIRECTIONS),
  legalArea: z.enum(CONTRACT_LEGAL_AREAS).array(),
  status: z.enum(ENTITY_STATUS).array(),
});

export type QueryManyParams = z.infer<typeof zQueryManyParams>;
export type QueryOneParams = z.infer<typeof zQueryOneParams>;

const contractFields: Record<keyof Contract, any> = {
  id: contracts.id,
  identification: contracts.identification,
  feePercent: contracts.feePercent,
  legalArea: contracts.legalArea,
  slug: contracts.slug,
  status: contracts.status,
  client: clients.fullName,
  lawyer: employees.fullName,
};

const contractAssignmentFilter = inArray(contractEmployees.assignment, [
  "responsible",
  "recommended",
]);

export const contractRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(zQueryOneParams)
    .query(async ({ ctx: { db }, input: { slug } }): Promise<Contract> => {
      const data = await db
        .select(contractFields)
        .from(contracts)
        .innerJoin(clients, eq(clients.id, contracts.clientId))
        .innerJoin(
          contractEmployees,
          and(
            eq(contractEmployees.contractId, contracts.id),
            contractAssignmentFilter,
          ),
        )
        .innerJoin(employees, eq(employees.id, contractEmployees.employeeId))
        .orderBy(desc(contractFields.lawyer))
        .where(eq(contracts.slug, slug))
        .limit(1);

      if (!data[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Contract not found",
        });
      }

      return data[0];
    }),

  getMany: publicProcedure
    .input(zQueryManyParams)
    .query(
      async ({
        ctx: { db },
        input: { query, page, limit, column, direction, legalArea, status },
      }): Promise<{ count: number; data: Contract[] }> => {
        const sort =
          direction === "descending"
            ? desc(contractFields[column])
            : contractFields[column];

        const offset = (page - 1) * limit;

        const joinConditions = {
          clients: eq(clients.id, contracts.clientId),
          contractEmployees: and(
            eq(contractEmployees.contractId, contracts.id),
            contractAssignmentFilter,
          ),
          employees: eq(employees.id, contractEmployees.employeeId),
        };

        const filters = (() => {
          const filters: (SQL | undefined)[] = [];

          if (query)
            filters.push(
              or(
                ilike(contracts.identification, `%${query}%`),
                ilike(employees.fullName, `%${query}%`),
                ilike(clients.fullName, `%${query}%`),
              ),
            );

          if (legalArea.length > 0)
            filters.push(inArray(contracts.legalArea, legalArea));

          if (status.length > 0)
            filters.push(inArray(contracts.status, status));

          return filters.length > 0 ? and(...filters) : undefined;
        })();

        const [rawCount, rawData] = await Promise.all([
          db
            .select({ count: count() })
            .from(contracts)
            .innerJoin(clients, joinConditions.clients)
            .innerJoin(contractEmployees, joinConditions.contractEmployees)
            .innerJoin(employees, joinConditions.employees)
            .where(filters),
          db
            .select(contractFields)
            .from(contracts)
            .innerJoin(clients, joinConditions.clients)
            .innerJoin(contractEmployees, joinConditions.contractEmployees)
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
