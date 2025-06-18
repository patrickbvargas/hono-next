import * as React from "react";
import {
  Wrapper,
  WrapperContent,
  WrapperFooter,
  WrapperHeader,
  Search,
  Pagination,
} from "~/shared/components";
import { api } from "~/trpc/server";
import { EmployeeTable } from "./components/table";
import type { QueryParams } from "./utils/query-params";

interface Props {
  queryParams: QueryParams;
}

export const Employees = async ({ queryParams }: Props) => {
  const { data, count } = await api.employees.getMany(queryParams);

  return (
    <Wrapper>
      <WrapperHeader className="flex-col items-start">
        <Search />
        <pre>{JSON.stringify(queryParams)}</pre>
      </WrapperHeader>
      <WrapperContent>
        <EmployeeTable data={data} />
      </WrapperContent>
      <WrapperFooter>
        <Pagination totalRecords={count} />
      </WrapperFooter>
    </Wrapper>
  );
};
