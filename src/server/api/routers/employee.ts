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
import { TRPCError } from "@trpc/server";
import type { Employee } from "~/shared/types/employee";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import { contractEmployees, employees } from "~/server/db/schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { and, eq, sql, inArray, count, ilike, or, desc } from "drizzle-orm";

const zQueryOneParams = z.object({
  slug: z.string(),
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

const employeeFields: Record<keyof Employee, any> = {
  id: employees.id,
  fullName: employees.fullName,
  oabNumber: employees.oabNumber,
  remunerationPercent: employees.remunerationPercent,
  type: employees.type,
  role: employees.role,
  slug: employees.slug,
  status: employees.status,
  contractCount: sql<number>`count(${contractEmployees.id})`,
};

const contractAssignmentFilter = inArray(contractEmployees.assignment, [
  "responsible",
  "recommended",
  "admin_assistant",
]);

export const employeeRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(zQueryOneParams)
    .query(async ({ ctx: { db }, input: { slug } }): Promise<Employee> => {
      const data = await db
        .select(employeeFields)
        .from(employees)
        .leftJoin(
          contractEmployees,
          and(
            eq(contractEmployees.employeeId, employees.id),
            contractAssignmentFilter,
          ),
        )
        .where(eq(employees.slug, slug))
        .groupBy(employees.id);

      if (!data[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employee not found",
        });
      }

      return data[0];
    }),

  getMany: publicProcedure
    .input(zQueryManyParams)
    .query(
      async ({
        ctx: { db },
        input: { query, page, limit, column, direction, type, role, status },
      }): Promise<{ count: number; data: Employee[] }> => {
        const sort =
          direction === "descending"
            ? desc(employeeFields[column])
            : employeeFields[column];

        const offset = (page - 1) * limit;

        const filters = and(
          or(
            ilike(employees.fullName, `%${query}%`),
            ilike(employees.oabNumber, `%${query}%`),
          ),
          type.length > 0 ? inArray(employees.type, type) : undefined,
          role.length > 0 ? inArray(employees.role, role) : undefined,
          status.length > 0 ? inArray(employees.status, status) : undefined,
        );

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
});
