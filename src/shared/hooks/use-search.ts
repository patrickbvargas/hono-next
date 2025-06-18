import { useQueryStates } from "nuqs";
import { useDebouncedCallback } from "./use-debounce";
import { zSearchParams } from "~/shared/schemas/query-params";
import { paginationParser, searchParser } from "~/shared/lib/nuqs";

export function useSearch() {
  const [search, setSearch] = useQueryStates(
    { ...searchParser, ...paginationParser },
    { shallow: false },
  );

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch({
      query,
      page: 1,
    });
  }, 300);

  return { search: zSearchParams.parse(search), handleSearch };
}
