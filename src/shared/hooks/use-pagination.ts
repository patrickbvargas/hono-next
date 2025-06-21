import { useQueryStates } from "nuqs";
import { paginationParser } from "~/shared/lib/nuqs";
import { zPaginationParser } from "~/shared/schemas/query-parser";

export function usePagination() {
  const [pagination, setPagination] = useQueryStates(paginationParser, {
    shallow: false,
  });

  const handlePagination = (pageNumber: number) => {
    setPagination({
      page: pageNumber,
      limit: pagination.limit,
    });
  };

  return { pagination: zPaginationParser.parse(pagination), handlePagination };
}
