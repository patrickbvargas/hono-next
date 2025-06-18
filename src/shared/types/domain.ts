import type { AppRouter } from "~/server/api/root";
import type { inferProcedureOutput } from "@trpc/server";

export type Employee = inferProcedureOutput<AppRouter["employees"]["getOne"]>;
export type EmployeeType = Employee["type"];
export type EmployeeRole = Employee["role"];
