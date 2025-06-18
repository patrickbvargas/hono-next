"use client";

import { columns } from "./columns";
import { DataTable } from "~/shared/components";
import type { Employee } from "~/shared/types/domain";

interface Props {
  data: Employee[];
}

export const EmployeeTable = ({ data }: Props) => {
  return <DataTable columns={columns} data={data} />;
};
