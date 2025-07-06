"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { formatter } from "~/shared/lib/formatter";
import type { FeeSummary } from "~/shared/types/fee";
import { createColumnHelper } from "@tanstack/react-table";
import { FEE_SORT_COLUMNS } from "~/shared/constants/fee";
import { ButtonEntityRow, DataTable } from "~/shared/components";

const isSortable = (column: keyof FeeSummary) =>
  FEE_SORT_COLUMNS.includes(column as (typeof FEE_SORT_COLUMNS)[number]);

interface FeeTableProps {
  fees: FeeSummary[];
  totalCount: number;
  onSelectFee: (fee: FeeSummary) => void;
}

export const FeeTable = ({ fees, totalCount, onSelectFee }: FeeTableProps) => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<FeeSummary>();

    return [
      columnHelper.accessor("contract", {
        header: "Processo",
        cell: ({ row }) => (
          <ButtonEntityRow onSelectItem={() => onSelectFee(row.original)}>
            {row.original.contract}
          </ButtonEntityRow>
        ),
        enableSorting: isSortable("contract"),
      }),
      columnHelper.accessor("client", {
        header: "Cliente",
        enableSorting: isSortable("client"),
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

  return <DataTable totalCount={totalCount} columns={columns} data={fees} />;
};
