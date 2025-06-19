import * as React from "react";
import {
  Wrapper,
  WrapperBody,
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
      <WrapperHeader>
        <Search />
        <pre>{JSON.stringify(queryParams)}</pre>
      </WrapperHeader>
      <WrapperBody>
        <EmployeeTable data={data} />
      </WrapperBody>
      <WrapperFooter>
        <Pagination totalRecords={count} />
      </WrapperFooter>
    </Wrapper>
  );
};
