import { api } from "~/trpc/server";
import type { SearchParams } from "nuqs/server";
import { ClientList } from "~/features/client-list";
import { loadQueryParams } from "~/features/client-list/utils/query";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function ClientsPage({ searchParams }: Props) {
  const queryParams = await loadQueryParams(searchParams);
  const { data, count } = await api.clients.getMany(queryParams);

  return <ClientList clients={data} count={count} />;
}
