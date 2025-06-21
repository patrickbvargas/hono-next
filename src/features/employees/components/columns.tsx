"use client";

import { Chip } from "@heroui/chip";
import { EllipsisIcon } from "lucide-react";
import { formatter } from "~/shared/lib/formatter";
import type { Employee } from "~/shared/types/employee";
import { createColumnHelper } from "@tanstack/react-table";
import { EMPLOYEE_SORT_COLUMNS } from "~/shared/constants/employee";

const isSortable = (column: string) =>
  EMPLOYEE_SORT_COLUMNS.includes(column as any);

const columnHelper = createColumnHelper<Employee>();
export const columns = [
  columnHelper.accessor("fullName", {
    header: "Nome",
    enableSorting: isSortable("fullName"),
    meta: {
      headerClassName: "md:min-w-[260px]",
    },
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
  columnHelper.display({
    id: "actions",
    cell: () => <EllipsisIcon size={16} className="opacity-60" />,
  }),
];
