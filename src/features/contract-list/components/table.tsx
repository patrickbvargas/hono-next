"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { formatter } from "~/shared/lib/formatter";
import { createColumnHelper } from "@tanstack/react-table";
import { ChipStatus, DataTable } from "~/shared/components";
import type { ContractSummary } from "~/shared/types/contract";
import { CONTRACT_SORT_COLUMNS } from "~/shared/constants/contract";

const isSortable = (column: keyof ContractSummary) =>
  CONTRACT_SORT_COLUMNS.includes(
    column as (typeof CONTRACT_SORT_COLUMNS)[number],
  );

interface ContractTableProps {
  contracts: ContractSummary[];
  totalCount: number;
  onRowAction: (rowIndex: React.Key) => void;
}

export const ContractTable = ({
  contracts,
  totalCount,
  onRowAction,
}: ContractTableProps) => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<ContractSummary>();

    return [
      columnHelper.accessor("identification", {
        header: "Processo",
        enableSorting: isSortable("identification"),
      }),
      columnHelper.accessor("client", {
        header: "Cliente",
        enableSorting: isSortable("client"),
      }),
      columnHelper.accessor("lawyer", {
        header: "Advogado",
        enableSorting: isSortable("lawyer"),
      }),
      columnHelper.accessor("feePercent", {
        header: "Honorários",
        cell: ({ row }) => formatter.percent(row.original.feePercent),
        enableSorting: isSortable("feePercent"),
      }),
      columnHelper.accessor("legalArea", {
        header: "Área",
        cell: ({ row }) => (
          <Chip size="sm">
            {formatter.contractLegalArea(row.original.legalArea)}
          </Chip>
        ),
        enableSorting: isSortable("legalArea"),
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
      data={contracts}
      onRowAction={onRowAction}
    />
  );
};
