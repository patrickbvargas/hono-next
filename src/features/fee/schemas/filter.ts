import { z } from "zod/v4";
import { REVENUE_TYPES } from "~/shared/constants";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants";

export const zFilter = z.object({
  legalArea: z.enum(CONTRACT_LEGAL_AREAS).array(),
  revenueType: z.enum(REVENUE_TYPES).array(),
});

export type Filter = z.infer<typeof zFilter>;
