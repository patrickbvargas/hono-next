import { z } from "zod/v4";
import {
  DEFAULT_COLUMN,
  DEFAULT_DIRECTION,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_QUERY,
} from "~/shared/constants/query-defaults";
import { SORT_DIRECTIONS } from "../constants/sort";

export const zPaginationParser = z.object({
  page: z.number().int().min(1).default(DEFAULT_PAGE),
  limit: z.number().int().min(1).default(DEFAULT_LIMIT),
});

export const zSearchParser = z.object({
  query: z.string().default(DEFAULT_QUERY),
});

export const zSortParser = z.object({
  column: z.string().default(DEFAULT_COLUMN),
  direction: z.enum(SORT_DIRECTIONS).default(DEFAULT_DIRECTION),
});
