"use client";

import * as React from "react";
import { Detail } from "../detail";
import { Chip } from "@heroui/react";
import { formatter } from "~/shared/lib/formatter";
import { useModalActions } from "../../stores/use-modal";
import { createColumnHelper } from "@tanstack/react-table";
import { ChipStatus, DataTable } from "~/shared/components";
import type { EmployeeSummary } from "~/shared/types/employee";
import { EMPLOYEE_SORT_COLUMNS } from "~/shared/constants/employee";

const isSortable = (column: keyof EmployeeSummary) =>
  EMPLOYEE_SORT_COLUMNS.includes(
    column as (typeof EMPLOYEE_SORT_COLUMNS)[number],
  );

interface TableProps {
  employees: EmployeeSummary[];
  totalCount: number;
}

export const Table = ({ employees, totalCount }: TableProps) => {
  const { openViewModal } = useModalActions();

  const columns = React.useMemo(() => {
    const c = createColumnHelper<EmployeeSummary>();

    return [
      c.accessor("fullName", {
        header: "Nome",
        enableSorting: isSortable("fullName"),
      }),
      c.accessor("oabNumber", {
        header: "OAB",
        cell: ({ row }) => formatter.oab(row.original.oabNumber ?? ""),
        enableSorting: isSortable("oabNumber"),
      }),
      c.accessor("type", {
        header: "Cargo",
        cell: ({ row }) => formatter.employeeType(row.original.type),
        enableSorting: isSortable("type"),
      }),
      c.accessor("remunerationPercent", {
        header: "Remuneração",
        cell: ({ row }) => formatter.percent(row.original.remunerationPercent),
        enableSorting: isSortable("remunerationPercent"),
      }),
      c.accessor("contractCount", {
        header: "Contratos",
        enableSorting: isSortable("contractCount"),
      }),
      c.accessor("role", {
        header: "Perfil",
        cell: ({ row }) => (
          <Chip size="sm">{formatter.employeeRole(row.original.role)}</Chip>
        ),
        enableSorting: isSortable("role"),
      }),
      c.accessor("status", {
        header: "Status",
        cell: ({ row }) => <ChipStatus status={row.original.status} />,
        enableSorting: isSortable("status"),
      }),
      // c.display({
      //   id: "actions",
      //   header: "Ações",
      //   cell: ({ row }) => (
      //     <Button
      //       size="sm"
      //       variant="flat"
      //       color="primary"
      //       onPress={(e) => {
      //         e.stopPropagation();
      //         openEditModal(row.original.id);
      //       }}
      //     >
      //       Editar
      //     </Button>
      //   ),
      // }),
    ];
  }, []);

  return (
    <React.Fragment>
      <DataTable
        totalCount={totalCount}
        columns={columns}
        data={employees}
        onRowAction={(index) => {
          const employee = employees[Number(index)];
          if (employee) openViewModal(employee.id);
        }}
      />
      <Detail />
    </React.Fragment>
  );
};
