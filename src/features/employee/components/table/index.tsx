"use client";

import * as React from "react";
import {
  EntityStatus,
  DataTable,
  Badge,
  ButtonEdit,
} from "~/shared/components";
import { Detail } from "../detail";
import { formatter } from "~/shared/lib/formatter";
import { useModalActions } from "../../stores/use-modal";
import { EMPLOYEE_SORT_COLUMNS } from "~/shared/constants";
import { createColumnHelper } from "@tanstack/react-table";
import type { EmployeeSummary } from "~/shared/types/employee";

const isSortable = (column: keyof EmployeeSummary) =>
  EMPLOYEE_SORT_COLUMNS.includes(
    column as (typeof EMPLOYEE_SORT_COLUMNS)[number],
  );

interface TableProps {
  employees: EmployeeSummary[];
}

export const Table = ({ employees }: TableProps) => {
  const { openViewModal, openEditModal } = useModalActions();

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
          <Badge>{formatter.employeeRole(row.original.role)}</Badge>
        ),
        enableSorting: isSortable("role"),
      }),
      c.accessor("status", {
        header: "Status",
        cell: ({ row }) => <EntityStatus status={row.original.status} />,
        enableSorting: isSortable("status"),
      }),
      c.display({
        id: "actions",
        header: "Ações",
        cell: ({ row }) => (
          <ButtonEdit onClick={() => openEditModal(row.original.id)} />
        ),
      }),
    ];
  }, []);

  return (
    <React.Fragment>
      <DataTable
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
