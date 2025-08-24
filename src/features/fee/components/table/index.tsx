"use client";

import * as React from "react";
import { Detail } from "../detail";
import { formatter } from "~/shared/lib/formatter";
import type { FeeSummary } from "~/shared/types/fee";
import { FEE_SORT_COLUMNS } from "~/shared/constants";
import { DataTable, Badge } from "~/shared/components";
import { useModalActions } from "../../stores/use-modal";
import { createColumnHelper } from "@tanstack/react-table";

const isSortable = (column: keyof FeeSummary) =>
  FEE_SORT_COLUMNS.includes(column as (typeof FEE_SORT_COLUMNS)[number]);

interface TableProps {
  fees: FeeSummary[];
}

export const Table = ({ fees }: TableProps) => {
  const { openViewModal } = useModalActions();

  const columns = React.useMemo(() => {
    const c = createColumnHelper<FeeSummary>();

    return [
      c.accessor("contract", {
        header: "Processo",
        enableSorting: isSortable("contract"),
      }),
      c.accessor("client", {
        header: "Cliente",
        enableSorting: isSortable("client"),
      }),
      c.accessor("revenueType", {
        header: "Tipo Receita",
        cell: ({ row }) => formatter.revenueType(row.original.revenueType),
        enableSorting: isSortable("revenueType"),
      }),
      c.accessor("legalArea", {
        header: "Área",
        cell: ({ row }) => (
          <Badge>{formatter.contractLegalArea(row.original.legalArea)}</Badge>
        ),
        enableSorting: isSortable("legalArea"),
      }),
      c.accessor("paymentDate", {
        header: "Data",
        cell: ({ row }) => formatter.date(row.original.paymentDate),
        enableSorting: isSortable("paymentDate"),
      }),
      c.accessor("amount", {
        header: "Valor",
        cell: ({ row }) => formatter.currency(row.original.amount),
        enableSorting: isSortable("amount"),
      }),
    ];
  }, []);

  return (
    <React.Fragment>
      <DataTable
        columns={columns}
        data={fees}
        onRowAction={(index) => {
          const fee = fees[Number(index)];
          if (fee) openViewModal(fee.id);
        }}
      />
      <Detail />
    </React.Fragment>
  );
};
