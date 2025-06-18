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
import { sortDirection } from "~/shared/schemas/query-params";

export const paginationParser = {
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
  limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
};

export const searchParser = {
  query: parseAsString.withDefault(DEFAULT_QUERY),
};

export const sortParser = {
  column: parseAsString.withDefault(DEFAULT_COLUMN),
  direction: parseAsStringLiteral(sortDirection).withDefault(DEFAULT_DIRECTION),
};

export const baseQueryParser = {
  ...searchParser,
  ...paginationParser,
  ...sortParser,
};
