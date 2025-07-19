"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { ClientDetails } from "./details";
import { useEntityPanel } from "~/shared/hooks";
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
}

export const ClientTable = ({ clients, totalCount }: ClientTableProps) => {
  const { isOpen, onOpenChange, selectedItem, selectItem } =
    useEntityPanel<ClientSummary>();

  const columns = React.useMemo(() => {
    const c = createColumnHelper<ClientSummary>();

    return [
      c.accessor("fullName", {
        header: "Nome",
        enableSorting: isSortable("fullName"),
      }),
      c.accessor("cnpjf", {
        header: "CNPJF",
        cell: ({ row }) => formatter.cnpjf(row.original.cnpjf ?? ""),
        enableSorting: isSortable("cnpjf"),
      }),
      c.accessor("email", {
        header: "Email",
        enableSorting: isSortable("email"),
      }),
      c.accessor("contractCount", {
        header: "Contratos",
        enableSorting: isSortable("contractCount"),
      }),
      c.accessor("type", {
        header: "Tipo",
        cell: ({ row }) => (
          <Chip size="sm">{formatter.clientType(row.original.type)}</Chip>
        ),
        enableSorting: isSortable("type"),
      }),
      c.accessor("status", {
        header: "Status",
        cell: ({ row }) => <ChipStatus status={row.original.status} />,
        enableSorting: isSortable("status"),
      }),
    ];
  }, []);

  return (
    <React.Fragment>
      <DataTable
        totalCount={totalCount}
        columns={columns}
        data={clients}
        onRowAction={(index) => selectItem(clients[Number(index)])}
      />
      {selectedItem && (
        <ClientDetails
          id={selectedItem.id}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </React.Fragment>
  );
};
