"use client";

import * as React from "react";
import { Detail } from "../detail";
import { PenLineIcon } from "lucide-react";
import { formatter } from "~/shared/lib/formatter";
import { Button, Chip, Tooltip } from "@heroui/react";
import { useModalActions } from "../../stores/use-modal";
import { createColumnHelper } from "@tanstack/react-table";
import { ChipStatus, DataTable } from "~/shared/components";
import type { ClientSummary } from "~/shared/types/client";
import { CLIENT_SORT_COLUMNS } from "~/shared/constants/client";

const isSortable = (column: keyof ClientSummary) =>
  CLIENT_SORT_COLUMNS.includes(column as (typeof CLIENT_SORT_COLUMNS)[number]);

interface TableProps {
  clients: ClientSummary[];
  totalCount: number;
}

export const Table = ({ clients, totalCount }: TableProps) => {
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
          <Chip size="sm">{formatter.clientType(row.original.type)}</Chip>
        ),
        enableSorting: isSortable("type"),
      }),
      c.accessor("status", {
        header: "Status",
        cell: ({ row }) => <ChipStatus status={row.original.status} />,
        enableSorting: isSortable("status"),
      }),
      c.display({
        id: "actions",
        header: "Ações",
        cell: ({ row }) => (
          <Tooltip content="Editar" placement="left">
            <Button
              size="sm"
              isIconOnly
              variant="light"
              onPress={() => {
                openEditModal(row.original.id);
              }}
            >
              <PenLineIcon size={16} />
            </Button>
          </Tooltip>
        ),
      }),
    ];
  }, [openEditModal]);

  return (
    <React.Fragment>
      <DataTable
        totalCount={totalCount}
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
