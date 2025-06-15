import { useQueryStates } from "nuqs";
import { paginationParser } from "~/shared/lib/nuqs";
import { zPaginationParams } from "../schemas/query-params";

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

  return { pagination: zPaginationParams.parse(pagination), handlePagination };
}
