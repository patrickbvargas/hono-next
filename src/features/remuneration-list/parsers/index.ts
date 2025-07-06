import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { REVENUE_TYPES } from "~/shared/constants/revenue";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants/contract";
import type { SearchParamsParser } from "~/shared/types/nuqs";
import { paginationParser, searchParser } from "~/shared/lib/nuqs";
import { parseAsArrayOf, parseAsStringLiteral } from "nuqs/server";
import type { QueryManyParams } from "~/server/api/routers/remuneration";
import { REMUNERATION_SORT_COLUMNS } from "~/shared/constants/remuneration";

export const filterParser: Pick<
  SearchParamsParser<QueryManyParams>,
  "revenueType" | "legalArea"
> = {
  legalArea: parseAsArrayOf(
    parseAsStringLiteral(CONTRACT_LEGAL_AREAS),
  ).withDefault([]),
  revenueType: parseAsArrayOf(parseAsStringLiteral(REVENUE_TYPES)).withDefault(
    [],
  ),
};

export const sortParser: Pick<
  SearchParamsParser<QueryManyParams>,
  "column" | "direction"
> = {
  column: parseAsStringLiteral(REMUNERATION_SORT_COLUMNS).withDefault(
    REMUNERATION_SORT_COLUMNS[0],
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
