import { z } from "zod";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "~/shared/constants/query-defaults";

export const sortDirection = ["asc", "desc"] as const;

export type SortDirection = (typeof sortDirection)[number];

export const zBaseQueryParams = z.object({
  query: z.string(),
  page: z.number().int().min(1).default(DEFAULT_PAGE),
  limit: z.number().int().min(1).default(DEFAULT_LIMIT),
});

export type BaseQueryParams = z.infer<typeof zBaseQueryParams>;
