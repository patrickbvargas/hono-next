import { z } from "zod/v4";
import { CLIENT_TYPES } from "~/shared/constants";
import { ENTITY_STATUS } from "~/shared/constants";

export const zFilter = z.object({
  type: z.enum(CLIENT_TYPES).array(),
  status: z.enum(ENTITY_STATUS).array(),
});

export type Filter = z.infer<typeof zFilter>;
