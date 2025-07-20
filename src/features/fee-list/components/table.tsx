"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { FeeDetails } from "./details";
import { DataTable } from "~/shared/components";
import { useEntityPanel } from "~/shared/hooks";
import { formatter } from "~/shared/lib/formatter";
import type { FeeSummary } from "~/shared/types/fee";
import { FEE_SORT_COLUMNS } from "~/shared/constants/fee";
import { createColumnHelper } from "@tanstack/react-table";

const isSortable = (column: keyof FeeSummary) =>
  FEE_SORT_COLUMNS.includes(column as (typeof FEE_SORT_COLUMNS)[number]);

interface FeeTableProps {
  fees: FeeSummary[];
  totalCount: number;
}

export const FeeTable = ({ fees, totalCount }: FeeTableProps) => {
  const { isOpen, onOpenChange, selectedItem, selectItem } =
    useEntityPanel<FeeSummary>();

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
          <Chip size="sm">
            {formatter.contractLegalArea(row.original.legalArea)}
          </Chip>
        ),
        enableSorting: isSortable("legalArea"),
      }),
      c.accessor("paymentDate", {
        header: "Data",
        cell: ({ row }) => formatter.date(row.original.paymentDate),
        enableSorting: isSortable("paymentDate"),
      }),
      c.accessor("value", {
        header: "Valor",
        cell: ({ row }) => formatter.currency(row.original.value),
        enableSorting: isSortable("value"),
      }),
    ];
  }, []);

  return (
    <React.Fragment>
      <DataTable
        totalCount={totalCount}
        columns={columns}
        data={fees}
        onRowAction={(index) => selectItem(fees[Number(index)])}
      />
      {selectedItem && (
        <FeeDetails
          id={selectedItem.id}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </React.Fragment>
  );
};
