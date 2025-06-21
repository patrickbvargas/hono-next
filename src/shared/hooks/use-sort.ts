import { useQueryStates } from "nuqs";
import type { SortDescriptor } from "@heroui/table";
import { zSortParser } from "~/shared/schemas/query-parser";
import { paginationParser, sortParser } from "~/shared/lib/nuqs";

export function useSort() {
  const [sort, setSort] = useQueryStates(
    { ...sortParser, ...paginationParser },
    { shallow: false },
  );

  const handleSort = (sort: SortDescriptor) => {
    setSort({
      column: String(sort.column),
      direction: sort.direction,
      page: 1,
    });
  };

  return { sort: zSortParser.parse(sort), handleSort };
}
