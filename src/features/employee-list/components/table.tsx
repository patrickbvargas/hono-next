"use client";

import * as React from "react";
import { Chip } from "@heroui/react";
import { formatter } from "~/shared/lib/formatter";
import type { Employee } from "~/shared/types/employee";
import { createColumnHelper } from "@tanstack/react-table";
import { ButtonEntityRow, ChipStatus, DataTable } from "~/shared/components";
import { EMPLOYEE_SORT_COLUMNS } from "~/shared/constants/employee";

const isSortable = (column: keyof Employee) =>
  EMPLOYEE_SORT_COLUMNS.includes(
    column as (typeof EMPLOYEE_SORT_COLUMNS)[number],
  );

interface EmployeeTableProps {
  employees: Employee[];
  totalCount: number;
  onSelectEmployee: (employee: Employee) => void;
}

export const EmployeeTable = ({
  employees,
  totalCount,
  onSelectEmployee,
}: EmployeeTableProps) => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Employee>();

    return [
      columnHelper.accessor("fullName", {
        header: "Nome",
        cell: ({ row }) => (
          <ButtonEntityRow onSelectItem={() => onSelectEmployee(row.original)}>
            {row.original.fullName}
          </ButtonEntityRow>
        ),
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
    <DataTable totalCount={totalCount} columns={columns} data={employees} />
  );
};
