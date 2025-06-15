import * as React from "react";
import { api } from "~/trpc/server";
import { type ParsedQueryParams } from "./utils/query-params";

interface Props {
  queryParams: ParsedQueryParams;
}

export const Employees = async ({ queryParams }: Props) => {
  const { data, count } = await api.employees.getAll(queryParams);

  return (
    <div className="space-y-4">
      <p className="font-semibold">Count: {count}</p>
      <pre className="p-2 border-1 border-white rounded-md w-80">
        {JSON.stringify(queryParams, null, 2)}
      </pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
