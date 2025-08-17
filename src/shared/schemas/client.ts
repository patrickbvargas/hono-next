import { z } from "zod/v4";
import { CLIENT_TYPES } from "~/shared/constants/client";

export const zClientForm = z.object({
  mode: z.enum(["create", "edit"]),
  id: z.string().optional(),
  fullName: z.string().min(1, "Nome é obrigatório"),
  cnpjf: z
    .string()
    .min(1, "CNPJ/CPF é obrigatório")
    .regex(
      /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{3}\.\d{3}\.\d{3}-\d{2})$/,
      "Formato CNPJ/CPF inválido",
    ),
  email: z.email("Email inválido").optional().or(z.literal("")),
  mobilePhone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato de telefone inválido")
    .optional()
    .or(z.literal("")),
  type: z.enum(CLIENT_TYPES, "Selecione um tipo válido"),
});

export type ClientForm = z.infer<typeof zClientForm>;
