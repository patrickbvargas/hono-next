import type { SearchParams } from "nuqs/server";
import { Employees } from "~/features/employees";
import { loadQueryParams } from "~/features/employees/utils/query-params";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function PageEmployees({ searchParams }: Props) {
  const queryParams = await loadQueryParams(searchParams);

  return <Employees queryParams={queryParams} />;
}
