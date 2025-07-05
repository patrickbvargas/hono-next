import { api } from "~/trpc/server";
import type { SearchParams } from "nuqs/server";
import { ContractList } from "~/features/contract-list";
import { loadQueryParams } from "~/features/contract-list/utils/query";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function EmployeesPage({ searchParams }: Props) {
  const queryParams = await loadQueryParams(searchParams);
  const { data, count } = await api.contracts.getMany(queryParams);

  return <ContractList contracts={data} count={count} />;
}
