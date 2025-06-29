import { columns } from "./columns";
import { DataTable } from "~/shared/components";
import type { Client } from "~/shared/types/client";

interface ClientTableProps {
  data: Client[];
  totalCount: number;
}

export const ClientTable = ({ data, totalCount }: ClientTableProps) => {
  return <DataTable totalCount={totalCount} columns={columns} data={data} />;
};
