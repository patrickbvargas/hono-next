import { z } from "zod/v4";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants/contract";

export const zFilter = z.object({
  legalArea: z.enum(CONTRACT_LEGAL_AREAS).array(),
  status: z.enum(ENTITY_STATUS).array(),
});

export type Filter = z.infer<typeof zFilter>;
