import type { SearchParams } from "nuqs/server";
import { EmployeeList } from "~/features/employee-list";
import { loadQueryParams } from "~/features/employee-list/utils/query";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function PageEmployees({ searchParams }: Props) {
  const queryParams = await loadQueryParams(searchParams);

  return <EmployeeList queryParams={queryParams} />;
}
