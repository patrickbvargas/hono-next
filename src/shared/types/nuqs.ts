import type { ParserBuilder } from "nuqs/server";

type NuqsParserWithDefault<T> = Omit<ParserBuilder<T>, "parseServerSide"> & {
  readonly defaultValue: T;
  parseServerSide(value: string | string[] | undefined): T;
};

export type SearchParamsParser<T> = {
  [K in keyof T]: NuqsParserWithDefault<T[K]>;
};
