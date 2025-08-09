import { createLoader } from "nuqs/server";
import { queryManyParser } from "../parsers";

export const loadQueryParams = createLoader(queryManyParser);

export type QueryManyParams = Awaited<ReturnType<typeof loadQueryParams>>;
