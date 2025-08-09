"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { ContractDetails } from "./details";
import { useEntityPanel } from "~/shared/hooks";
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
}

export const ContractTable = ({
  contracts,
  totalCount,
}: ContractTableProps) => {
  const { isOpen, onOpenChange, selectedItem, selectItem } =
    useEntityPanel<ContractSummary>();

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
          <Chip size="sm">
            {formatter.contractLegalArea(row.original.legalArea)}
          </Chip>
        ),
        enableSorting: isSortable("legalArea"),
      }),
      c.accessor("status", {
        header: "Status",
        cell: ({ row }) => <ChipStatus status={row.original.status} />,
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
        onRowAction={(index) => selectItem(contracts[Number(index)])}
      />
      {selectedItem && (
        <ContractDetails
          id={selectedItem.id}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </React.Fragment>
  );
};
