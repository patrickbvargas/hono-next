import { api } from "~/trpc/server";
import type { SearchParams } from "nuqs/server";
import { FeeList } from "~/features/fee-list";
import { loadQueryParams } from "~/features/fee-list/utils/query";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function FeesPage({ searchParams }: Props) {
  const queryParams = await loadQueryParams(searchParams);
  const { data, count } = await api.fees.getMany(queryParams);

  return <FeeList fees={data} count={count} />;
}
