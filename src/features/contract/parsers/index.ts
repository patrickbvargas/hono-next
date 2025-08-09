import {
  CONTRACT_LEGAL_AREAS,
  CONTRACT_SORT_COLUMNS,
} from "~/shared/constants/contract";
import { SORT_DIRECTIONS } from "~/shared/constants/sort";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import type { SearchParamsParser } from "~/shared/types/nuqs";
import { paginationParser, searchParser } from "~/shared/lib/nuqs";
import { parseAsArrayOf, parseAsStringLiteral } from "nuqs/server";
import type { QueryManyParams } from "~/server/api/routers/contract";

export const filterParser: Pick<
  SearchParamsParser<QueryManyParams>,
  "legalArea" | "status"
> = {
  legalArea: parseAsArrayOf(
    parseAsStringLiteral(CONTRACT_LEGAL_AREAS),
  ).withDefault([]),
  status: parseAsArrayOf(parseAsStringLiteral(ENTITY_STATUS)).withDefault([]),
};

export const sortParser: Pick<
  SearchParamsParser<QueryManyParams>,
  "column" | "direction"
> = {
  column: parseAsStringLiteral(CONTRACT_SORT_COLUMNS).withDefault(
    CONTRACT_SORT_COLUMNS[0],
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
