"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { useEntityPanel } from "~/shared/hooks";
import { DataTable } from "~/shared/components";
import { RemunerationDetails } from "./details";
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
}

export const RemunerationTable = ({
  remunerations,
  totalCount,
}: RemunerationTableProps) => {
  const { isOpen, onOpenChange, selectedItem, selectItem } =
    useEntityPanel<RemunerationSummary>();

  const columns = React.useMemo(() => {
    const c = createColumnHelper<RemunerationSummary>();

    return [
      c.accessor("contract", {
        header: "Processo",
        enableSorting: isSortable("contract"),
      }),
      c.accessor("employee", {
        header: "Funcionário",
        enableSorting: isSortable("employee"),
      }),
      c.accessor("percentage", {
        header: "%",
        cell: ({ row }) => formatter.percent(row.original.percentage),
        enableSorting: isSortable("percentage"),
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
        data={remunerations}
        onRowAction={(index) => selectItem(remunerations[Number(index)])}
      />
      {selectedItem && (
        <RemunerationDetails
          id={selectedItem.id}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </React.Fragment>
  );
};
