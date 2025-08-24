import { z } from "zod/v4";
import { EMPLOYEE_ROLES, EMPLOYEE_TYPES } from "~/shared/constants";

export const zEmployeeForm = z
  .object({
    mode: z.enum(["create", "edit"]),
    id: z.string().optional(),
    fullName: z.string().min(1, "Nome é obrigatório"),
    email: z.email("Email inválido"),
    oabNumber: z
      .string()
      .regex(/^RS\d{6}$/, "Formato OAB inválido (ex: RS123456)")
      .optional()
      .or(z.literal("")),
    remunerationPercent: z.coerce
      .number<number>()
      .min(0.01, "Percentual deve ser maior que 0%")
      .max(1, "Percentual não pode exceder 100%"),
    referrerPercent: z.coerce
      .number<number>()
      .min(0.01, "Percentual deve ser maior que 0%")
      .max(1, "Percentual não pode exceder 100%"),
    type: z.enum(EMPLOYEE_TYPES, "Selecione uma função válida"),
    role: z.enum(EMPLOYEE_ROLES, "Selecione um perfil válido"),
    password: z.string().optional(),
  })
  .check(({ value, issues }) => {
    if (value.type === "lawyer" && !value.oabNumber) {
      issues.push({
        code: "custom",
        input: value,
        path: ["oabNumber"],
        message: "OAB é obrigatório",
      });
    }

    if (value.mode === "create" && !value.password) {
      issues.push({
        code: "custom",
        input: value,
        path: ["password"],
        message: "Senha é obrigatória",
      });
    }

    if (
      value.mode === "create" &&
      value.password &&
      value.password.length < 6
    ) {
      issues.push({
        code: "custom",
        input: value,
        path: ["password"],
        message: "A senha deve ter no mínimo 6 caracteres",
      });
    }
  });

export type EmployeeForm = z.infer<typeof zEmployeeForm>;
