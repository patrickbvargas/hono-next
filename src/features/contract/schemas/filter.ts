import { z } from "zod/v4";
import { ENTITY_STATUS } from "~/shared/constants";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants";

export const zFilter = z.object({
  legalArea: z.enum(CONTRACT_LEGAL_AREAS).array(),
  status: z.enum(ENTITY_STATUS).array(),
});

export type Filter = z.infer<typeof zFilter>;
