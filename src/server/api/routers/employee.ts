import {
  and,
  eq,
  sql,
  inArray,
  count,
  ilike,
  or,
  desc,
  SQL,
} from "drizzle-orm";
import {
  EMPLOYEE_ROLES,
  EMPLOYEE_SORT_COLUMNS,
  EMPLOYEE_TYPES,
} from "~/shared/constants/employee";
import {
  zPaginationParser,
  zSearchParser,
} from "~/shared/schemas/query-parser";
import { z } from "zod/v4";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import type { EmployeeSummary } from "~/shared/types/employee";
import { contractEmployees, employees } from "~/server/db/schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { QueryManyFields, QueryManyReturnType } from "../types/query";

const zQueryOneParams = z.object({
  id: z.string(),
});

const zQueryManyParams = z.object({
  ...zSearchParser.shape,
  ...zPaginationParser.shape,
  column: z.enum(EMPLOYEE_SORT_COLUMNS),
  direction: z.enum(SORT_DIRECTIONS),
  type: z.enum(EMPLOYEE_TYPES).array(),
  role: z.enum(EMPLOYEE_ROLES).array(),
  status: z.enum(ENTITY_STATUS).array(),
});

export type QueryManyParams = z.infer<typeof zQueryManyParams>;
export type QueryOneParams = z.infer<typeof zQueryOneParams>;

function getFilters({
  query,
  type,
  role,
  status,
}: Pick<QueryManyParams, "query" | "type" | "role" | "status">) {
  const filters: (SQL | undefined)[] = [];

  if (query)
    filters.push(
      or(
        ilike(employees.fullName, `%${query}%`),
        ilike(employees.oabNumber, `%${query}%`),
      ),
    );

  if (type.length > 0) filters.push(inArray(employees.type, type));

  if (role.length > 0) filters.push(inArray(employees.role, role));

  if (status.length > 0) filters.push(inArray(employees.status, status));

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
    contractEmployees: and(
      eq(contractEmployees.employeeId, employees.id),
      inArray(contractEmployees.assignment, [
        "responsible",
        "recommended",
        "admin_assistant",
      ]),
    ),
  };
}

const selectFields = {
  id: employees.id,
  fullName: employees.fullName,
  oabNumber: employees.oabNumber,
  remunerationPercent: employees.remunerationPercent,
  type: employees.type,
  role: employees.role,
  status: employees.status,
  contractCount: sql<number>`count(${contractEmployees.id})`,
} satisfies QueryManyFields<EmployeeSummary>;

export const employeeRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(zQueryManyParams)
    .query(
      async ({
        ctx: { db },
        input: { query, page, limit, column, direction, type, role, status },
      }): Promise<QueryManyReturnType<EmployeeSummary>> => {
        const offset = (page - 1) * limit;
        const joinRules = getJoinRules();
        const sortBy = getSort({ column, direction });
        const filters = getFilters({ query, type, role, status });

        const [rawCount, rawData] = await Promise.all([
          db
            .select({ count: count() })
            .from(employees)
            .leftJoin(contractEmployees, joinRules.contractEmployees)
            .where(filters),
          db
            .select(selectFields)
            .from(employees)
            .leftJoin(contractEmployees, joinRules.contractEmployees)
            .where(filters)
            .groupBy(employees.id)
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
