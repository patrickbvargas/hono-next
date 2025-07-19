"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { formatter } from "~/shared/lib/formatter";
import type { ClientSummary } from "~/shared/types/client";
import { createColumnHelper } from "@tanstack/react-table";
import { ChipStatus, DataTable } from "~/shared/components";
import { CLIENT_SORT_COLUMNS } from "~/shared/constants/client";

const isSortable = (column: keyof ClientSummary) =>
  CLIENT_SORT_COLUMNS.includes(column as (typeof CLIENT_SORT_COLUMNS)[number]);

interface ClientTableProps {
  clients: ClientSummary[];
  totalCount: number;
  onRowAction: (rowIndex: React.Key) => void;
}

export const ClientTable = ({
  clients,
  totalCount,
  onRowAction,
}: ClientTableProps) => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<ClientSummary>();

    return [
      columnHelper.accessor("fullName", {
        header: "Nome",
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
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => <ChipStatus status={row.original.status} />,
        enableSorting: isSortable("status"),
      }),
    ];
  }, []);

  return (
    <DataTable
      totalCount={totalCount}
      columns={columns}
      data={clients}
      onRowAction={onRowAction}
    />
  );
};
