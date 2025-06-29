import { z } from "zod/v4";
import { CLIENT_TYPES } from "~/shared/constants/client";

export const zFilter = z.object({
  type: z.enum(CLIENT_TYPES).array(),
});

export type Filter = z.infer<typeof zFilter>;
