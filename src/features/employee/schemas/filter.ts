import { z } from "zod/v4";
import { ENTITY_STATUS } from "~/shared/constants";
import { EMPLOYEE_ROLES, EMPLOYEE_TYPES } from "~/shared/constants";

export const zEmployeeFilter = z.object({
  type: z.enum(EMPLOYEE_TYPES).array(),
  role: z.enum(EMPLOYEE_ROLES).array(),
  status: z.enum(ENTITY_STATUS).array(),
});

export type EmployeeFilter = z.infer<typeof zEmployeeFilter>;
