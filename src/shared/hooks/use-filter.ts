import { useQueryStates } from "nuqs";
import type { SearchParamsParser } from "../types/nuqs";

export function useFilter<T>(filterParser: SearchParamsParser<T>) {
  const [filters, handleFilters] = useQueryStates(filterParser, {
    shallow: false,
  });

  return { filters, handleFilters };
}
