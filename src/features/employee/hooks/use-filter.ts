import { filterParser } from "../parsers";
import { useEntityFilter } from "~/shared/hooks";
import { zEmployeeFilter } from "../schemas/filter";
import { getDefaultFilterValues } from "../utils/default";

export function useFilter() {
  return useEntityFilter({
    parser: filterParser,
    schema: zEmployeeFilter,
    defaultValues: getDefaultFilterValues(),
  });
}
