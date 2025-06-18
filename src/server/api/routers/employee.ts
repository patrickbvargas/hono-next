import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { zBaseQueryParams } from "~/shared/schemas/query-params";
import { contractEmployees, employees } from "~/server/db/schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { and, eq, sql, inArray, count, ilike, or, desc } from "drizzle-orm";

export const queryOptions = {
  sortColumns: [
    "fullName",
    "oabNumber",
    "remunerationPercent",
    "role",
    "type",
    "contractCount",
  ] as const,
  employeeRoles: ["user", "admin"] as const,
  employeeTypes: ["lawyer", "admin_assistant"] as const,
};

const zQueryOneParams = z.object({
  id: z.string(),
});

const zQueryManyParams = zBaseQueryParams.extend({
  column: z.enum(queryOptions.sortColumns),
  type: z.enum(queryOptions.employeeTypes).array(),
  role: z.enum(queryOptions.employeeRoles).array(),
});

export type QueryManyParams = z.infer<typeof zQueryManyParams>;
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
  getOne: publicProcedure
    .input(zQueryOneParams)
    .query(async ({ ctx: { db }, input: { id } }) => {
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
        .where(eq(employees.id, id))
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
        input: { query, page, limit, column, direction, type, role },
      }) => {
        const sort =
          direction === "desc"
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
