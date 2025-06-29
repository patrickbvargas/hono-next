import { api } from "~/trpc/server";
import type { SearchParams } from "nuqs/server";
import { EmployeeList } from "~/features/employee-list";
import { loadQueryParams } from "~/features/employee-list/utils/query";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function EmployeesPage({ searchParams }: Props) {
  const queryParams = await loadQueryParams(searchParams);
  const { data, count } = await api.employees.getMany(queryParams);

  return <EmployeeList employees={data} count={count} />;
}
