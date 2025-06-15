import { useQueryStates } from "nuqs";
import { paginationParser, sortParser } from "~/shared/lib/nuqs";
import { zSortParams, type SortDirection } from "~/shared/schemas/query-params";

export function useSort() {
  const [sort, setSort] = useQueryStates(
    { ...sortParser, ...paginationParser },
    { shallow: false },
  );

  const toggleDirection = (column: string): SortDirection => {
    return column === sort.column && sort.direction === "asc" ? "desc" : "asc";
  };

  const handleSort = (column: string) => {
    setSort({
      column,
      direction: toggleDirection(column),
      page: 1,
    });
  };

  return { sort: zSortParams.parse(sort), handleSort };
}
