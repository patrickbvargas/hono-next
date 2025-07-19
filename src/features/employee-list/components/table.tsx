"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { formatter } from "~/shared/lib/formatter";
import { createColumnHelper } from "@tanstack/react-table";
import { ChipStatus, DataTable } from "~/shared/components";
import type { EmployeeSummary } from "~/shared/types/employee";
import { EMPLOYEE_SORT_COLUMNS } from "~/shared/constants/employee";

const isSortable = (column: keyof EmployeeSummary) =>
  EMPLOYEE_SORT_COLUMNS.includes(
    column as (typeof EMPLOYEE_SORT_COLUMNS)[number],
  );

interface EmployeeTableProps {
  employees: EmployeeSummary[];
  totalCount: number;
  onRowAction: (rowIndex: React.Key) => void;
}

export const EmployeeTable = ({
  employees,
  totalCount,
  onRowAction,
}: EmployeeTableProps) => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<EmployeeSummary>();

    return [
      columnHelper.accessor("fullName", {
        header: "Nome",
        enableSorting: isSortable("fullName"),
      }),
      columnHelper.accessor("oabNumber", {
        header: "OAB",
        cell: ({ row }) => formatter.oab(row.original.oabNumber ?? ""),
        enableSorting: isSortable("oabNumber"),
      }),
      columnHelper.accessor("type", {
        header: "Cargo",
        cell: ({ row }) => formatter.employeeType(row.original.type),
        enableSorting: isSortable("type"),
      }),
      columnHelper.accessor("remunerationPercent", {
        header: "Remuneração",
        cell: ({ row }) => formatter.percent(row.original.remunerationPercent),
        enableSorting: isSortable("remunerationPercent"),
      }),
      columnHelper.accessor("contractCount", {
        header: "Contratos",
        enableSorting: isSortable("contractCount"),
      }),
      columnHelper.accessor("role", {
        header: "Perfil",
        cell: ({ row }) => (
          <Chip size="sm">{formatter.employeeRole(row.original.role)}</Chip>
        ),
        enableSorting: isSortable("role"),
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
      data={employees}
      onRowAction={onRowAction}
    />
  );
};
