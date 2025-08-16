import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { REVENUE_TYPES } from "~/shared/constants/revenue";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants/contract";
import type { SearchParamsParser } from "~/shared/types/nuqs";
import { paginationParser, searchParser } from "~/shared/lib/nuqs";
import { parseAsArrayOf, parseAsStringLiteral } from "nuqs/server";
import type { QueryManyParams } from "~/server/api/routers/remuneration";
import { REMUNERATION_SORT_COLUMNS } from "~/shared/constants/remuneration";

// Consolidated parser for all remuneration query parameters
export const queryManyParser: SearchParamsParser<QueryManyParams> = {
  // Search and pagination
  ...searchParser,
  ...paginationParser,
  
  // Sorting
  column: parseAsStringLiteral(REMUNERATION_SORT_COLUMNS).withDefault(
    REMUNERATION_SORT_COLUMNS[0],
  ),
  direction: parseAsStringLiteral(SORT_DIRECTIONS).withDefault(
    SORT_DIRECTIONS[0],
  ),
  
  // Filtering
  legalArea: parseAsArrayOf(
    parseAsStringLiteral(CONTRACT_LEGAL_AREAS),
  ).withDefault([]),
  revenueType: parseAsArrayOf(parseAsStringLiteral(REVENUE_TYPES)).withDefault(
    [],
  ),
};

// Extract filter-specific parser for use-filter hook
export const filterParser: Pick<
  SearchParamsParser<QueryManyParams>,
  "revenueType" | "legalArea"
> = {
  legalArea: queryManyParser.legalArea,
  revenueType: queryManyParser.revenueType,
};
