"use client";

import * as React from "react";
import { Detail } from "../detail";
import { formatter } from "~/shared/lib/formatter";
import { Badge } from "~/shared/components/ui/badge";
import { useModalActions } from "../../stores/use-modal";
import { createColumnHelper } from "@tanstack/react-table";
import { EntityStatus, DataTable } from "~/shared/components";
import type { ContractSummary } from "~/shared/types/contract";
import { CONTRACT_SORT_COLUMNS } from "~/shared/constants/contract";

const isSortable = (column: keyof ContractSummary) =>
  CONTRACT_SORT_COLUMNS.includes(
    column as (typeof CONTRACT_SORT_COLUMNS)[number],
  );

interface TableProps {
  contracts: ContractSummary[];
  totalCount: number;
}

export const Table = ({ contracts, totalCount }: TableProps) => {
  const { openViewModal } = useModalActions();

  const columns = React.useMemo(() => {
    const c = createColumnHelper<ContractSummary>();

    return [
      c.accessor("identification", {
        header: "Processo",
        enableSorting: isSortable("identification"),
      }),
      c.accessor("client", {
        header: "Cliente",
        enableSorting: isSortable("client"),
      }),
      c.accessor("lawyer", {
        header: "Advogado",
        enableSorting: isSortable("lawyer"),
      }),
      c.accessor("feePercent", {
        header: "Honorários",
        cell: ({ row }) => formatter.percent(row.original.feePercent),
        enableSorting: isSortable("feePercent"),
      }),
      c.accessor("legalArea", {
        header: "Área",
        cell: ({ row }) => (
          <Badge>{formatter.contractLegalArea(row.original.legalArea)}</Badge>
        ),
        enableSorting: isSortable("legalArea"),
      }),
      c.accessor("status", {
        header: "Status",
        cell: ({ row }) => <EntityStatus status={row.original.status} />,
        enableSorting: isSortable("status"),
      }),
    ];
  }, []);

  return (
    <React.Fragment>
      <DataTable
        totalCount={totalCount}
        columns={columns}
        data={contracts}
        onRowAction={(index) => {
          const contract = contracts[Number(index)];
          if (contract) openViewModal(contract.id);
        }}
      />
      <Detail />
    </React.Fragment>
  );
};
