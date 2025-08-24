import type {
  QueryFields,
  QueryManyReturnType,
  QueryOneReturnType,
} from "../types/query";
import {
  clients,
  contracts,
  employees,
  contractEmployees,
} from "~/server/db/schemas";
import {
  CONTRACT_LEGAL_AREAS,
  CONTRACT_SORT_COLUMNS,
} from "~/shared/constants";
import {
  zPaginationParser,
  zSearchParser,
} from "~/shared/schemas/query-parser";
import { z } from "zod/v4";
import { TRPCError } from "@trpc/server";
import { ENTITY_STATUS } from "~/shared/constants";
import { SORT_DIRECTIONS } from "~/shared/constants";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Contract, ContractSummary } from "~/shared/types/contract";
import { and, eq, inArray, count, ilike, or, desc, SQL } from "drizzle-orm";

const zQueryOneParams = z.object({
  id: z.string(),
});

const zQueryManyParams = z.object({
  ...zSearchParser.shape,
  ...zPaginationParser.shape,
  column: z.enum(CONTRACT_SORT_COLUMNS),
  direction: z.enum(SORT_DIRECTIONS),
  legalArea: z.enum(CONTRACT_LEGAL_AREAS).array(),
  status: z.enum(ENTITY_STATUS).array(),
});

export type QueryOneParams = z.infer<typeof zQueryOneParams>;
export type QueryManyParams = z.infer<typeof zQueryManyParams>;

function getFilters({
  query,
  legalArea,
  status,
}: Pick<QueryManyParams, "query" | "legalArea" | "status">) {
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

  if (status.length > 0) filters.push(inArray(contracts.status, status));

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
    clients: eq(clients.id, contracts.clientId),
    contractEmployees: and(
      eq(contractEmployees.contractId, contracts.id),
      inArray(contractEmployees.assignment, ["responsible", "recommended"]),
    ),
    employees: eq(employees.id, contractEmployees.employeeId),
  };
}

const queryManyFields = {
  id: contracts.id,
  identification: contracts.identification,
  feePercent: contracts.feePercent,
  legalArea: contracts.legalArea,
  status: contracts.status,
  client: clients.fullName,
  lawyer: employees.fullName,
} satisfies QueryFields<ContractSummary>;

export const contractRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(zQueryOneParams)
    .query(
      async ({
        ctx: { db },
        input: { id },
      }): Promise<QueryOneReturnType<Contract>> => {
        const data = await db.query.contracts.findFirst({
          columns: {
            id: true,
            identification: true,
            feePercent: true,
            observation: true,
            legalArea: true,
            status: true,
            createdAt: true,
          },
          with: {
            client: {
              columns: {
                fullName: true,
              },
            },
            employees: {
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
            revenues: {
              columns: {
                totalValue: true,
                downPayment: true,
                installmentsTotal: true,
                installmentsPaid: true,
                paymentStartDate: true,
                type: true,
              },
            },
          },
          where: eq(contracts.id, id),
        });

        if (!data) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Contract not found",
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
        input: { query, page, limit, column, direction, legalArea, status },
      }): Promise<QueryManyReturnType<ContractSummary>> => {
        const offset = (page - 1) * limit;
        const joinRules = getJoinRules();
        const sortBy = getSort({ column, direction });
        const filters = getFilters({ query, legalArea, status });

        const [rawCount, rawData] = await Promise.all([
          db
            .select({ count: count() })
            .from(contracts)
            .innerJoin(clients, joinRules.clients)
            .innerJoin(contractEmployees, joinRules.contractEmployees)
            .innerJoin(employees, joinRules.employees)
            .where(filters),
          db
            .select(queryManyFields)
            .from(contracts)
            .innerJoin(clients, joinRules.clients)
            .innerJoin(contractEmployees, joinRules.contractEmployees)
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
