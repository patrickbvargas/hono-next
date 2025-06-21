import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
} from "~/shared/components";
import { api } from "~/trpc/server";
import { EmployeeTable } from "./components/table";
import { EmployeeFilter } from "./components/filter";
import type { QueryManyParams } from "./utils/query";

interface Props {
  queryParams: QueryManyParams;
}

export const EmployeeList = async ({ queryParams }: Props) => {
  const { data, count } = await api.employees.getMany(queryParams);

  return (
    <Wrapper>
      <WrapperHeader>
        <Search placeholder="Filtrar por Nome ou OAB..." />
        <EmployeeFilter />
      </WrapperHeader>
      <WrapperBody>
        <EmployeeTable data={data} totalCount={count} />
      </WrapperBody>
    </Wrapper>
  );
};
