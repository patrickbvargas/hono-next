import {
  and,
  eq,
  sql,
  inArray,
  count,
  SQL,
  ilike,
  or,
  desc,
} from "drizzle-orm";
import { z } from "zod";
import { contractEmployees, employees } from "~/server/db/schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sortDirection, zBaseQueryParams } from "~/shared/schemas/query-params";

export const queryOptions = {
  sortColumns: [
    "fullName",
    "oabNumber",
    "remunerationPercent",
    "role",
    "type",
    "contractCount",
  ] as const,
  sortDirections: sortDirection,
  employeeRoles: ["user", "admin"] as const,
  employeeTypes: ["lawyer", "admin_assistant"] as const,
};

const zQueryAllParams = zBaseQueryParams.extend({
  column: z.enum(queryOptions.sortColumns),
  direction: z.enum(queryOptions.sortDirections),
  type: z.enum(queryOptions.employeeTypes).array(),
  role: z.enum(queryOptions.employeeRoles).array(),
});

const zQueryOneParams = z.object({
  id: z.string(),
});

export type QueryAllParams = z.infer<typeof zQueryAllParams>;
export type QueryOneParams = z.infer<typeof zQueryOneParams>;

const employeeFields = {
  id: employees.id,
  fullName: employees.fullName,
  oabNumber: employees.oabNumber,
  remunerationPercent: employees.remunerationPercent,
  type: employees.type,
  role: employees.role,
  slug: employees.slug,
  contractCount: sql<number>`count(${contractEmployees.id})`,
};

const contractAssignmentFilter = inArray(contractEmployees.assignment, [
  "responsible",
  "recommended",
  "admin_assistant",
]);

export const employeeRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(zQueryAllParams)
    .query(
      async ({
        ctx: { db },
        input: { query, page, limit, column, direction, type, role },
      }) => {
        const sortColumn: SQL =
          column === "contractCount"
            ? sql`count(${contractEmployees.id})`
            : sql`${employees[column]}`;

        const offset = (page - 1) * limit;

        const filters = and(
          or(
            ilike(employees.fullName, `%${query}%`),
            ilike(employees.oabNumber, `%${query}%`),
          ),
          type.length > 0 ? inArray(employees.type, type) : undefined,
          role.length > 0 ? inArray(employees.role, role) : undefined,
        );

        const sort = direction === "desc" ? desc(sortColumn) : sortColumn;

        const [rawCount, rawData] = await Promise.all([
          db.select({ count: count() }).from(employees).where(filters),
          db
            .select(employeeFields)
            .from(employees)
            .leftJoin(
              contractEmployees,
              and(
                eq(contractEmployees.employeeId, employees.id),
                contractAssignmentFilter,
              ),
            )
            .where(filters)
            .groupBy(employees.id)
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

  getOne: publicProcedure
    .input(zQueryOneParams)
    .query(async ({ ctx: { db }, input: { id } }) => {
      return await db
        .select(employeeFields)
        .from(employees)
        .leftJoin(
          contractEmployees,
          and(
            eq(contractEmployees.employeeId, employees.id),
            contractAssignmentFilter,
          ),
        )
        .where(eq(employees.id, id))
        .groupBy(employees.id);
    }),
});
