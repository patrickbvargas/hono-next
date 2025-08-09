import { z } from "zod/v4";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import { EMPLOYEE_ROLES, EMPLOYEE_TYPES } from "~/shared/constants/employee";

export const zFilter = z.object({
  type: z.enum(EMPLOYEE_TYPES).array(),
  role: z.enum(EMPLOYEE_ROLES).array(),
  status: z.enum(ENTITY_STATUS).array(),
});

export type Filter = z.infer<typeof zFilter>;
