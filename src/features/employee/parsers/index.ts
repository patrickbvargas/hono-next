import {
  EMPLOYEE_ROLES,
  EMPLOYEE_SORT_COLUMNS,
  EMPLOYEE_TYPES,
} from "~/shared/constants/employee";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import type { SearchParamsParser } from "~/shared/types/nuqs";
import { paginationParser, searchParser } from "~/shared/lib/nuqs";
import { parseAsArrayOf, parseAsStringLiteral } from "nuqs/server";
import type { QueryManyParams } from "~/server/api/routers/employee";

// Consolidated parser for all employee query parameters
export const queryManyParser: SearchParamsParser<QueryManyParams> = {
  // Search and pagination
  ...searchParser,
  ...paginationParser,
  
  // Sorting
  column: parseAsStringLiteral(EMPLOYEE_SORT_COLUMNS).withDefault(
    EMPLOYEE_SORT_COLUMNS[0],
  ),
  direction: parseAsStringLiteral(SORT_DIRECTIONS).withDefault(
    SORT_DIRECTIONS[0],
  ),
  
  // Filtering
  type: parseAsArrayOf(parseAsStringLiteral(EMPLOYEE_TYPES)).withDefault([]),
  role: parseAsArrayOf(parseAsStringLiteral(EMPLOYEE_ROLES)).withDefault([]),
  status: parseAsArrayOf(parseAsStringLiteral(ENTITY_STATUS)).withDefault([]),
};

// Extract filter-specific parser for use-filter hook
export const filterParser: Pick<
  SearchParamsParser<QueryManyParams>,
  "type" | "role" | "status"
> = {
  type: queryManyParser.type,
  role: queryManyParser.role,
  status: queryManyParser.status,
};