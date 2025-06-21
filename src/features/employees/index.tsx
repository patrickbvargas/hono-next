import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
} from "~/shared/components";
import { api } from "~/trpc/server";
import { EmployeeTable } from "./components/table";
import type { QueryManyParams } from "./utils/query-params";

interface Props {
  queryParams: QueryManyParams;
}

export const Employees = async ({ queryParams }: Props) => {
  const { data, count } = await api.employees.getMany(queryParams);

  return (
    <Wrapper>
      <WrapperHeader className="grid grid-cols-2 gap-2 justify-start">
        <Search />
        <pre className="col-span-full">{JSON.stringify(queryParams)}</pre>
      </WrapperHeader>
      <WrapperBody>
        <EmployeeTable data={data} totalCount={count} />
      </WrapperBody>
    </Wrapper>
  );
};
