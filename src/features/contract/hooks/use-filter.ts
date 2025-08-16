import { filterParser } from "../parsers";
import { zFilter } from "../schemas/filter";
import { useEntityFilter } from "~/shared/hooks";
import { getDefaultFilterValues } from "../utils/default";

export function useFilter() {
  return useEntityFilter({
    parser: filterParser,
    schema: zFilter,
    defaultValues: getDefaultFilterValues(),
  });
}
