"use client";

import * as React from "react";
import { Detail } from "../detail";
import { Edit2 } from "lucide-react";
import { Chip, Button } from "@heroui/react";
import { useEntityPanel } from "~/shared/hooks";
import { formatter } from "~/shared/lib/formatter";
import { createColumnHelper } from "@tanstack/react-table";
import { ChipStatus, DataTable } from "~/shared/components";
import { EMPLOYEE_SORT_COLUMNS } from "~/shared/constants/employee";
import type { EmployeeSummary, Employee } from "~/shared/types/employee";

const isSortable = (column: keyof EmployeeSummary) =>
  EMPLOYEE_SORT_COLUMNS.includes(
    column as (typeof EMPLOYEE_SORT_COLUMNS)[number],
  );

interface TableProps {
  employees: EmployeeSummary[];
  totalCount: number;
  onEditEmployee: (employee: Employee) => void;
}

export const Table = ({
  employees,
  totalCount,
  onEditEmployee,
}: TableProps) => {
  const { isOpen, onOpenChange, selectedItem, selectItem } =
    useEntityPanel<EmployeeSummary>();

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
      c.display({
        id: "actions",
        header: "Ações",
        cell: ({ row }) => (
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="light"
              color="primary"
              isIconOnly
              onPress={() => onEditEmployee?.(row.original as Employee)}
              title="Editar funcionário"
            >
              <Edit2 size={16} />
            </Button>
          </div>
        ),
      }),
    ];
  }, [onEditEmployee]);

  return (
    <React.Fragment>
      <DataTable
        totalCount={totalCount}
        columns={columns}
        data={employees}
        onRowAction={(index) => selectItem(employees[Number(index)])}
      />
      {selectedItem && (
        <Detail
          id={selectedItem.id}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onEditEmployee={onEditEmployee}
        />
      )}
    </React.Fragment>
  );
};
