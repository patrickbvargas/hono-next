"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { DataTable } from "~/shared/components";
import { formatter } from "~/shared/lib/formatter";
import { createColumnHelper } from "@tanstack/react-table";
import type { RemunerationSummary } from "~/shared/types/remuneration";
import { REMUNERATION_SORT_COLUMNS } from "~/shared/constants/remuneration";

const isSortable = (column: keyof RemunerationSummary) =>
  REMUNERATION_SORT_COLUMNS.includes(
    column as (typeof REMUNERATION_SORT_COLUMNS)[number],
  );

interface RemunerationTableProps {
  remunerations: RemunerationSummary[];
  totalCount: number;
  onRowAction: (rowIndex: React.Key) => void;
}

export const RemunerationTable = ({
  remunerations,
  totalCount,
  onRowAction,
}: RemunerationTableProps) => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<RemunerationSummary>();

    return [
      columnHelper.accessor("contract", {
        header: "Processo",
        enableSorting: isSortable("contract"),
      }),
      columnHelper.accessor("employee", {
        header: "Funcionário",
        enableSorting: isSortable("employee"),
      }),
      columnHelper.accessor("revenueType", {
        header: "Tipo Receita",
        cell: ({ row }) => formatter.revenueType(row.original.revenueType),
        enableSorting: isSortable("revenueType"),
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
      columnHelper.accessor("remunerationPercent", {
        header: "%",
        cell: ({ row }) => formatter.percent(row.original.remunerationPercent),
        enableSorting: isSortable("remunerationPercent"),
      }),
      columnHelper.accessor("paymentDate", {
        header: "Data",
        cell: ({ row }) => formatter.date(row.original.paymentDate),
        enableSorting: isSortable("paymentDate"),
      }),
      columnHelper.accessor("value", {
        header: "Valor",
        cell: ({ row }) => formatter.currency(row.original.value),
        enableSorting: isSortable("value"),
      }),
    ];
  }, []);

  return (
    <DataTable
      totalCount={totalCount}
      columns={columns}
      data={remunerations}
      onRowAction={onRowAction}
    />
  );
};
