import { z } from "zod";
import {
  DEFAULT_COLUMN,
  DEFAULT_DIRECTION,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_QUERY,
} from "~/shared/constants/query-defaults";

export const sortDirection = ["asc", "desc"] as const;

export const zPaginationParams = z.object({
  page: z.number().int().min(1).default(DEFAULT_PAGE),
  limit: z.number().int().min(1).default(DEFAULT_LIMIT),
});

export const zSearchParams = z.object({
  query: z.string().default(DEFAULT_QUERY),
});

export const zSortParams = z.object({
  column: z.string().default(DEFAULT_COLUMN),
  direction: z.enum(sortDirection).default(DEFAULT_DIRECTION),
});

export const zBaseQueryParams = zSearchParams
  .merge(zPaginationParams)
  .merge(zSortParams);

export type SortDirection = (typeof sortDirection)[number];
export type PaginationParams = z.infer<typeof zPaginationParams>;
export type SearchParams = z.infer<typeof zSearchParams>;
export type SortParams = z.infer<typeof zSortParams>;
export type BaseQueryParams = z.infer<typeof zBaseQueryParams>;
