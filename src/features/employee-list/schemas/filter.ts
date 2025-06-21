import { z } from "zod/v4";
import { EMPLOYEE_ROLES, EMPLOYEE_TYPES } from "~/shared/constants/employee";

export const zFilter = z.object({
  type: z.enum(EMPLOYEE_TYPES).array(),
  role: z.enum(EMPLOYEE_ROLES).array(),
});

export type Filter = z.infer<typeof zFilter>;
