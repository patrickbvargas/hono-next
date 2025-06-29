"use client";

import {
  Chip,
  Link,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { EllipsisIcon } from "lucide-react";
import { formatter } from "~/shared/lib/formatter";
import type { Employee } from "~/shared/types/employee";
import { createColumnHelper } from "@tanstack/react-table";
import { EMPLOYEE_SORT_COLUMNS } from "~/shared/constants/employee";

const isSortable = (column: keyof Employee) =>
  EMPLOYEE_SORT_COLUMNS.includes(
    column as (typeof EMPLOYEE_SORT_COLUMNS)[number],
  );

const columnHelper = createColumnHelper<Employee>();
export const columns = [
  columnHelper.accessor("fullName", {
    header: "Nome",
    cell: ({ row }) => (
      <Link
        href={`/funcionarios/${row.original.slug}`}
        isBlock
        size="sm"
        color="foreground"
      >
        {row.original.fullName}
      </Link>
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
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <EllipsisIcon size={16} className="opacity-60 rotate-90" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions">
          <DropdownItem key="view" href={`/funcionarios/${row.original.slug}`}>
            Visualizar
          </DropdownItem>
          <DropdownItem key="edit">Editar</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Excluir
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ),
  }),
];
