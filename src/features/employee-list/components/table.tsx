import { columns } from "./columns";
import { DataTable } from "~/shared/components";
import type { Employee } from "~/shared/types/employee";

interface EmployeeTableProps {
  data: Employee[];
  totalCount: number;
}

export const EmployeeTable = ({ data, totalCount }: EmployeeTableProps) => {
  return <DataTable totalCount={totalCount} columns={columns} data={data} />;
};
