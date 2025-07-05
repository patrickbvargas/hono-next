"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { formatter } from "~/shared/lib/formatter";
import type { Client } from "~/shared/types/client";
import { createColumnHelper } from "@tanstack/react-table";
import { CLIENT_SORT_COLUMNS } from "~/shared/constants/client";
import { ButtonEntityRow, DataTable } from "~/shared/components";

const isSortable = (column: keyof Client) =>
  CLIENT_SORT_COLUMNS.includes(column as (typeof CLIENT_SORT_COLUMNS)[number]);

interface ClientTableProps {
  clients: Client[];
  totalCount: number;
  onSelectClient: (client: Client) => void;
}

export const ClientTable = ({
  clients,
  totalCount,
  onSelectClient,
}: ClientTableProps) => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Client>();

    return [
      columnHelper.accessor("fullName", {
        header: "Nome",
        cell: ({ row }) => (
          <ButtonEntityRow onSelectItem={() => onSelectClient(row.original)}>
            {row.original.fullName}
          </ButtonEntityRow>
        ),
        enableSorting: isSortable("fullName"),
      }),
      columnHelper.accessor("cnpjf", {
        header: "CNPJF",
        cell: ({ row }) => formatter.cnpjf(row.original.cnpjf ?? ""),
        enableSorting: isSortable("cnpjf"),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        enableSorting: isSortable("email"),
      }),
      columnHelper.accessor("contractCount", {
        header: "Contratos",
        enableSorting: isSortable("contractCount"),
      }),
      columnHelper.accessor("type", {
        header: "Tipo",
        cell: ({ row }) => (
          <Chip size="sm">{formatter.clientType(row.original.type)}</Chip>
        ),
        enableSorting: isSortable("type"),
      }),
    ];
  }, []);

  return <DataTable totalCount={totalCount} columns={columns} data={clients} />;
};
