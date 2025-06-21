import { useQueryStates } from "nuqs";
import { useDebouncedCallback } from "./use-debounce";
import { zSearchParser } from "~/shared/schemas/query-parser";
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

  return { search: zSearchParser.parse(search), handleSearch };
}
