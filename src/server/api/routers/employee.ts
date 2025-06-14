import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const employees = await ctx.db.query.employees.findMany();

    return employees ?? null;
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const employee = await ctx.db.query.employees.findFirst({
      where: (employee, { eq }) => eq(employee.id, input),
    });

    return employee ?? null;
  }),
});
