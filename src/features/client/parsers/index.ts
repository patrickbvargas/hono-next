import {
  CLIENT_TYPES,
  CLIENT_SORT_COLUMNS,
} from "~/shared/constants/client";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import type { SearchParamsParser } from "~/shared/types/nuqs";
import { paginationParser, searchParser } from "~/shared/lib/nuqs";
import { parseAsArrayOf, parseAsStringLiteral } from "nuqs/server";
import type { QueryManyParams } from "~/server/api/routers/client";

// Consolidated parser for all client query parameters
export const queryManyParser: SearchParamsParser<QueryManyParams> = {
  // Search and pagination
  ...searchParser,
  ...paginationParser,
  
  // Sorting
  column: parseAsStringLiteral(CLIENT_SORT_COLUMNS).withDefault(
    CLIENT_SORT_COLUMNS[0],
  ),
  direction: parseAsStringLiteral(SORT_DIRECTIONS).withDefault(
    SORT_DIRECTIONS[0],
  ),
  
  // Filtering
  type: parseAsArrayOf(parseAsStringLiteral(CLIENT_TYPES)).withDefault([]),
  status: parseAsArrayOf(parseAsStringLiteral(ENTITY_STATUS)).withDefault([]),
};

// Extract filter-specific parser for use-filter hook
export const filterParser: Pick<
  SearchParamsParser<QueryManyParams>,
  "type" | "status"
> = {
  type: queryManyParser.type,
  status: queryManyParser.status,
};
