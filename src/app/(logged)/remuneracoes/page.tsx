import { api } from "~/trpc/server";
import type { SearchParams } from "nuqs/server";
import { RemunerationList } from "~/features/remuneration";
import { loadQueryParams } from "~/features/remuneration/utils/query";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function RemunerationsPage({ searchParams }: Props) {
  const queryParams = await loadQueryParams(searchParams);
  const { data, count } = await api.remunerations.getMany(queryParams);

  return <RemunerationList remunerations={data} count={count} />;
}
