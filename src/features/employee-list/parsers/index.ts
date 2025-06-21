import {
  EMPLOYEE_ROLES,
  EMPLOYEE_SORT_COLUMNS,
  EMPLOYEE_TYPES,
} from "~/shared/constants/employee";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import type { SearchParamsParser } from "~/shared/types/nuqs";
import { paginationParser, searchParser } from "~/shared/lib/nuqs";
import { parseAsArrayOf, parseAsStringLiteral } from "nuqs/server";
import type { QueryManyParams } from "~/server/api/routers/employee";

export const filterParser: Pick<
  SearchParamsParser<QueryManyParams>,
  "type" | "role"
> = {
  type: parseAsArrayOf(parseAsStringLiteral(EMPLOYEE_TYPES)).withDefault([]),
  role: parseAsArrayOf(parseAsStringLiteral(EMPLOYEE_ROLES)).withDefault([]),
};

export const sortParser: Pick<
  SearchParamsParser<QueryManyParams>,
  "column" | "direction"
> = {
  column: parseAsStringLiteral(EMPLOYEE_SORT_COLUMNS).withDefault(
    EMPLOYEE_SORT_COLUMNS[0],
  ),
  direction: parseAsStringLiteral(SORT_DIRECTIONS).withDefault(
    SORT_DIRECTIONS[0],
  ),
};

export const queryManyParser: SearchParamsParser<QueryManyParams> = {
  ...searchParser,
  ...paginationParser,
  ...sortParser,
  ...filterParser,
};
