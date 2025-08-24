import type {
  QueryFields,
  QueryManyReturnType,
  QueryOneReturnType,
} from "../types/query";
import {
  zPaginationParser,
  zSearchParser,
} from "~/shared/schemas/query-parser";
import {
  and,
  eq,
  inArray,
  count,
  ilike,
  desc,
  SQL,
  ne,
  isNull,
} from "drizzle-orm";
import { z } from "zod/v4";
import { TRPCError } from "@trpc/server";
import { clients } from "~/server/db/schemas";
import { zClientForm } from "~/shared/schemas/client";
import { SORT_DIRECTIONS } from "~/shared/constants";
import { ENTITY_STATUS } from "~/shared/constants";
import type { MutationReturnType } from "../types/mutation";
import type { Client, ClientSummary } from "~/shared/types/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { CLIENT_TYPES, CLIENT_SORT_COLUMNS } from "~/shared/constants";

const zQueryOneParams = z.object({
  id: z.string(),
});

const zQueryManyParams = z.object({
  ...zSearchParser.shape,
  ...zPaginationParser.shape,
  column: z.enum(CLIENT_SORT_COLUMNS),
  direction: z.enum(SORT_DIRECTIONS),
  type: z.enum(CLIENT_TYPES).array(),
  status: z.enum(ENTITY_STATUS).array(),
});

export type QueryOneParams = z.infer<typeof zQueryOneParams>;
export type QueryManyParams = z.infer<typeof zQueryManyParams>;

function getFilters({
  query,
  type,
  status,
}: Pick<QueryManyParams, "query" | "type" | "status">) {
  const filters: (SQL | undefined)[] = [];

  if (query) filters.push(ilike(clients.fullName, `%${query}%`));

  if (type.length > 0) filters.push(inArray(clients.type, type));

  if (status.length > 0) filters.push(inArray(clients.status, status));

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
  id: clients.id,
  fullName: clients.fullName,
  cnpjf: clients.cnpjf,
  email: clients.email,
  type: clients.type,
  status: clients.status,
  contractCount: clients.contractCount,
} satisfies QueryFields<ClientSummary>;

export const clientRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(zQueryOneParams)
    .query(
      async ({
        ctx: { db },
        input: { id },
      }): Promise<QueryOneReturnType<Client>> => {
        const data = await db.query.clients.findFirst({
          columns: {
            id: true,
            fullName: true,
            cnpjf: true,
            email: true,
            mobilePhone: true,
            type: true,
            status: true,
            createdAt: true,
            contractCount: true,
          },
          where: eq(clients.id, id),
        });

        if (!data) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Client not found",
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
        input: { query, page, limit, column, direction, type, status },
      }): Promise<QueryManyReturnType<ClientSummary>> => {
        const offset = (page - 1) * limit;
        const sortBy = getSort({ column, direction });
        const filters = getFilters({ query, type, status });

        const [rawCount, rawData] = await Promise.all([
          db.select({ count: count() }).from(clients).where(filters),
          db
            .select(queryManyFields)
            .from(clients)
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
    .input(zClientForm)
    .mutation(
      async ({
        ctx: { db },
        input: { fullName, cnpjf, email, mobilePhone, type },
      }): Promise<MutationReturnType> => {
        const existingClient = await db.query.clients.findFirst({
          where: and(eq(clients.cnpjf, cnpjf), isNull(clients.deletedAt)),
        });

        if (existingClient) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "CNPJ/CPF já está em uso",
          });
        }

        if (email) {
          const existingEmail = await db.query.clients.findFirst({
            where: and(eq(clients.email, email), isNull(clients.deletedAt)),
          });

          if (existingEmail) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Email já está em uso",
            });
          }
        }

        const newClient = {
          id: JSON.stringify(new Date()), // TODO: implement hash
          fullName,
          cnpjf,
          email: email || null,
          mobilePhone: mobilePhone || null,
          type,
          contractCount: 0,
          status: "active" as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.insert(clients).values(newClient);

        return {
          id: newClient.id,
          message: "Cliente criado com sucesso",
        };
      },
    ),

  update: publicProcedure
    .input(zClientForm)
    .mutation(
      async ({
        ctx: { db },
        input: { id, fullName, cnpjf, email, mobilePhone, type },
      }): Promise<MutationReturnType> => {
        if (!id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "ID do cliente é obrigatório para atualização",
          });
        }

        const existingClient = await db.query.clients.findFirst({
          where: and(eq(clients.id, id), isNull(clients.deletedAt)),
        });

        if (!existingClient) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Cliente não encontrado",
          });
        }

        if (cnpjf && cnpjf !== existingClient.cnpjf) {
          const cnpjfExists = await db.query.clients.findFirst({
            where: and(
              eq(clients.cnpjf, cnpjf),
              ne(clients.id, id),
              isNull(clients.deletedAt),
            ),
          });

          if (cnpjfExists) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "CNPJ/CPF já está em uso por outro cliente",
            });
          }
        }

        if (email && email !== existingClient.email) {
          const emailExists = await db.query.clients.findFirst({
            where: and(
              eq(clients.email, email),
              ne(clients.id, id),
              isNull(clients.deletedAt),
            ),
          });

          if (emailExists) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Email já está em uso por outro cliente",
            });
          }
        }

        const updateData: Partial<typeof clients.$inferInsert> = {
          fullName,
          cnpjf,
          email: email || null,
          mobilePhone: mobilePhone || null,
          type,
          updatedAt: new Date(),
        };

        await db.update(clients).set(updateData).where(eq(clients.id, id));

        return {
          id,
          message: "Cliente atualizado com sucesso",
        };
      },
    ),
});
