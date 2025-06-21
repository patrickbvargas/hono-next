import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import {
  DEFAULT_COLUMN,
  DEFAULT_DIRECTION,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_QUERY,
} from "~/shared/constants/query-defaults";
import { SORT_DIRECTIONS } from "../constants/sort";

export const paginationParser = {
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
  limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
};

export const searchParser = {
  query: parseAsString.withDefault(DEFAULT_QUERY),
};

export const sortParser = {
  column: parseAsString.withDefault(DEFAULT_COLUMN),
  direction:
    parseAsStringLiteral(SORT_DIRECTIONS).withDefault(DEFAULT_DIRECTION),
};
