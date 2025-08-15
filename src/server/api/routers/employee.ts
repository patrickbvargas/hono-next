import type {
  QueryFields,
  QueryManyReturnType,
  QueryOneReturnType,
} from "../types/query";
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
import { employees } from "~/server/db/schemas";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { zEmployeeForm } from "~/shared/schemas/employee";
import type { MutationReturnType } from "../types/mutation";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Employee, EmployeeSummary } from "~/shared/types/employee";
import { and, eq, inArray, count, ilike, or, desc, SQL, ne, isNull } from "drizzle-orm";

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

export type QueryOneParams = z.infer<typeof zQueryOneParams>;
export type QueryManyParams = z.infer<typeof zQueryManyParams>;

function getFilters({
  query,
  type,
  role,
  status,
}: Pick<QueryManyParams, "query" | "type" | "role" | "status">) {
  const filters: (SQL | undefined)[] = [];

  // Always exclude soft-deleted records
  filters.push(isNull(employees.deletedAt));

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
    ? desc(queryManyFields[column])
    : queryManyFields[column];
}

const queryManyFields = {
  id: employees.id,
  fullName: employees.fullName,
  oabNumber: employees.oabNumber,
  remunerationPercent: employees.remunerationPercent,
  type: employees.type,
  role: employees.role,
  status: employees.status,
  contractCount: employees.contractCount,
} satisfies QueryFields<EmployeeSummary>;

export const employeeRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(zQueryOneParams)
    .query(
      async ({
        ctx: { db },
        input: { id },
      }): Promise<QueryOneReturnType<Employee>> => {
        const data = await db.query.employees.findFirst({
          where: and(eq(employees.id, id), isNull(employees.deletedAt)),
        });

        if (!data) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Employee not found",
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
        input: { query, page, limit, column, direction, type, role, status },
      }): Promise<QueryManyReturnType<EmployeeSummary>> => {
        const offset = (page - 1) * limit;
        const sortBy = getSort({ column, direction });
        const filters = getFilters({ query, type, role, status });

        const [rawCount, rawData] = await Promise.all([
          db.select({ count: count() }).from(employees).where(filters),
          db
            .select(queryManyFields)
            .from(employees)
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

  create: publicProcedure
    .input(zEmployeeForm)
    .mutation(
      async ({
        ctx: { db },
        input: {
          fullName,
          email,
          oabNumber,
          remunerationPercent,
          referrerPercent,
          type,
          role,
          password,
        },
      }): Promise<MutationReturnType> => {
        const existingEmployee = await db.query.employees.findFirst({
          where: and(eq(employees.email, email), isNull(employees.deletedAt)),
        });

        if (existingEmployee) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Email já está em uso",
          });
        }

        if (oabNumber) {
          const existingOAB = await db.query.employees.findFirst({
            where: and(eq(employees.oabNumber, oabNumber), isNull(employees.deletedAt)),
          });

          if (existingOAB) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Número da OAB já está em uso",
            });
          }
        }

        const hashedPassword = `temp_hash_${password}`;

        const newEmployee = {
          id: JSON.stringify(new Date()), // TODO: implement hash
          fullName,
          email,
          oabNumber: oabNumber || null,
          remunerationPercent,
          referrerPercent,
          type,
          role,
          password: hashedPassword,
          contractCount: 0,
          status: "active" as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.insert(employees).values(newEmployee);

        return {
          id: newEmployee.id,
          message: "Funcionário criado com sucesso",
        };
      },
    ),

  update: publicProcedure
    .input(zEmployeeForm)
    .mutation(
      async ({
        ctx: { db },
        input: {
          id,
          fullName,
          email,
          oabNumber,
          remunerationPercent,
          referrerPercent,
          type,
          role,
          password,
        },
      }): Promise<MutationReturnType> => {
        if (!id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "ID do funcionário é obrigatório para atualização",
          });
        }

        const existingEmployee = await db.query.employees.findFirst({
          where: and(eq(employees.id, id), isNull(employees.deletedAt)),
        });

        if (!existingEmployee) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Funcionário não encontrado",
          });
        }

        if (email && email !== existingEmployee.email) {
          const emailExists = await db.query.employees.findFirst({
            where: and(
              eq(employees.email, email), 
              ne(employees.id, id),
              isNull(employees.deletedAt)
            ),
          });

          if (emailExists) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Email já está em uso por outro funcionário",
            });
          }
        }

        if (oabNumber && oabNumber !== existingEmployee.oabNumber) {
          const oabExists = await db.query.employees.findFirst({
            where: and(
              eq(employees.oabNumber, oabNumber),
              ne(employees.id, id),
              isNull(employees.deletedAt)
            ),
          });

          if (oabExists) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Número da OAB já está em uso por outro funcionário",
            });
          }
        }

        const updateData: Partial<typeof employees.$inferInsert> = {
          fullName,
          email,
          oabNumber: oabNumber || null,
          remunerationPercent,
          referrerPercent,
          type,
          role,
          updatedAt: new Date(),
        };

        if (password) {
          updateData.password = `temp_hash_${password}`;
        }

        await db.update(employees).set(updateData).where(eq(employees.id, id));

        return {
          id,
          message: "Funcionário atualizado com sucesso",
        };
      },
    ),

  delete: publicProcedure
    .input(zQueryOneParams)
    .mutation(
      async ({ ctx: { db }, input: { id } }): Promise<MutationReturnType> => {
        if (!id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "ID do funcionário é obrigatório para exclusão",
          });
        }

        // Check if employee exists and is not already soft-deleted
        const existingEmployee = await db.query.employees.findFirst({
          where: and(eq(employees.id, id), isNull(employees.deletedAt)),
        });

        if (!existingEmployee) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Funcionário não encontrado",
          });
        }

        // Soft delete: set deletedAt timestamp
        await db
          .update(employees)
          .set({
            deletedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(employees.id, id));

        return {
          id,
          message: "Funcionário excluído com sucesso",
        };
      },
    ),
});
