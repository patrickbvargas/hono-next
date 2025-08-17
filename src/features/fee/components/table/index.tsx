"use client";

import * as React from "react";
import { Detail } from "../detail";
import { DataTable } from "~/shared/components";
import { formatter } from "~/shared/lib/formatter";
import { Badge } from "~/shared/components/ui/badge";
import type { FeeSummary } from "~/shared/types/fee";
import { useModalActions } from "../../stores/use-modal";
import { FEE_SORT_COLUMNS } from "~/shared/constants/fee";
import { createColumnHelper } from "@tanstack/react-table";

const isSortable = (column: keyof FeeSummary) =>
  FEE_SORT_COLUMNS.includes(column as (typeof FEE_SORT_COLUMNS)[number]);

interface TableProps {
  fees: FeeSummary[];
  totalCount: number;
}

export const Table = ({ fees, totalCount }: TableProps) => {
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
        totalCount={totalCount}
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
