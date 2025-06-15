import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import {
  type QueryAllParams,
  queryOptions as opt,
} from "~/server/api/routers/employee";
import type { SearchParamsParser } from "~/shared/types/nuqs";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "~/shared/constants/query-defaults";

const queryParamsParser: SearchParamsParser<QueryAllParams> = {
  query: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
  limit: parseAsInteger.withDefault(DEFAULT_LIMIT),
  column: parseAsStringLiteral(opt.sortColumns).withDefault(opt.sortColumns[0]),
  direction: parseAsStringLiteral(opt.sortDirections).withDefault(
    opt.sortDirections[0],
  ),
  type: parseAsArrayOf(parseAsStringLiteral(opt.employeeTypes)).withDefault([]),
  role: parseAsArrayOf(parseAsStringLiteral(opt.employeeRoles)).withDefault([]),
};

export const loadQueryParams = createLoader(queryParamsParser);

export type ParsedQueryParams = Awaited<ReturnType<typeof loadQueryParams>>;
