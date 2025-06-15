import * as React from "react";
import {
  Wrapper,
  WrapperContent,
  WrapperFooter,
  WrapperHeader,
} from "~/shared/components/wrapper";
import { api } from "~/trpc/server";
import { type ParsedQueryParams } from "./utils/query-params";

interface Props {
  queryParams: ParsedQueryParams;
}

export const Employees = async ({ queryParams }: Props) => {
  const { data, count } = await api.employees.getAll(queryParams);

  return (
    <Wrapper>
      <WrapperHeader>
        <pre>{JSON.stringify(queryParams)}</pre>
      </WrapperHeader>
      <WrapperContent>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </WrapperContent>
      <WrapperFooter>Total itens: {count}</WrapperFooter>
    </Wrapper>
  );
};
