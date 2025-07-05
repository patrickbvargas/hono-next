"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { formatter } from "~/shared/lib/formatter";
import type { Contract } from "~/shared/types/contract";
import { createColumnHelper } from "@tanstack/react-table";
import { CONTRACT_SORT_COLUMNS } from "~/shared/constants/contract";
import { ButtonEntityRow, ChipStatus, DataTable } from "~/shared/components";

const isSortable = (column: keyof Contract) =>
  CONTRACT_SORT_COLUMNS.includes(
    column as (typeof CONTRACT_SORT_COLUMNS)[number],
  );

interface ContractTableProps {
  contracts: Contract[];
  totalCount: number;
  onSelectContract: (contract: Contract) => void;
}

export const ContractTable = ({
  contracts,
  totalCount,
  onSelectContract,
}: ContractTableProps) => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Contract>();

    return [
      columnHelper.accessor("identification", {
        header: "Processo",
        cell: ({ row }) => (
          <ButtonEntityRow onSelectItem={() => onSelectContract(row.original)}>
            {row.original.identification}
          </ButtonEntityRow>
        ),
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
    <DataTable totalCount={totalCount} columns={columns} data={contracts} />
  );
};
