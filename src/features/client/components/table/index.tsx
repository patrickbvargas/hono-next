"use client";

import * as React from "react";
import {
  EntityStatus,
  DataTable,
  ButtonEdit,
  Badge,
} from "~/shared/components";
import { Detail } from "../detail";
import { formatter } from "~/shared/lib/formatter";
import { useModalActions } from "../../stores/use-modal";
import { CLIENT_SORT_COLUMNS } from "~/shared/constants";
import { createColumnHelper } from "@tanstack/react-table";
import type { ClientSummary } from "~/shared/types/client";

const isSortable = (column: keyof ClientSummary) =>
  CLIENT_SORT_COLUMNS.includes(column as (typeof CLIENT_SORT_COLUMNS)[number]);

interface TableProps {
  clients: ClientSummary[];
}

export const Table = ({ clients }: TableProps) => {
  const { openViewModal, openEditModal } = useModalActions();

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
          <Badge>{formatter.clientType(row.original.type)}</Badge>
        ),
        enableSorting: isSortable("type"),
      }),
      c.accessor("status", {
        header: "Status",
        cell: ({ row }) => <EntityStatus status={row.original.status} />,
        enableSorting: isSortable("status"),
      }),
      c.display({
        id: "actions",
        header: "Ações",
        cell: ({ row }) => (
          <ButtonEdit onClick={() => openEditModal(row.original.id)} />
        ),
      }),
    ];
  }, [openEditModal]);

  return (
    <React.Fragment>
      <DataTable
        columns={columns}
        data={clients}
        onRowAction={(index) => {
          const client = clients[Number(index)];
          if (client) openViewModal(client.id);
        }}
      />
      <Detail />
    </React.Fragment>
  );
};
