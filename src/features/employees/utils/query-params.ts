import {
  createLoader,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs/server";
import {
  type QueryManyParams,
  queryOptions as opt,
} from "~/server/api/routers/employee";
import { baseQueryParser } from "~/shared/lib/nuqs";
import type { SearchParamsParser } from "~/shared/types/nuqs";

const queryParamsParser: SearchParamsParser<QueryManyParams> = {
  ...baseQueryParser,
  column: parseAsStringLiteral(opt.sortColumns).withDefault(opt.sortColumns[0]),
  type: parseAsArrayOf(parseAsStringLiteral(opt.employeeTypes)).withDefault([]),
  role: parseAsArrayOf(parseAsStringLiteral(opt.employeeRoles)).withDefault([]),
};

export const loadQueryParams = createLoader(queryParamsParser);

export type QueryParams = Awaited<ReturnType<typeof loadQueryParams>>;
