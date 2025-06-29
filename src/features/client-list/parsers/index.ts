import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import type { SearchParamsParser } from "~/shared/types/nuqs";
import { paginationParser, searchParser } from "~/shared/lib/nuqs";
import { parseAsArrayOf, parseAsStringLiteral } from "nuqs/server";
import type { QueryManyParams } from "~/server/api/routers/client";
import { CLIENT_TYPES, CLIENT_SORT_COLUMNS } from "~/shared/constants/client";

export const filterParser: Pick<SearchParamsParser<QueryManyParams>, "type"> = {
  type: parseAsArrayOf(parseAsStringLiteral(CLIENT_TYPES)).withDefault([]),
};

export const sortParser: Pick<
  SearchParamsParser<QueryManyParams>,
  "column" | "direction"
> = {
  column: parseAsStringLiteral(CLIENT_SORT_COLUMNS).withDefault(
    CLIENT_SORT_COLUMNS[0],
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
