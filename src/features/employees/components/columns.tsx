"use client";

import { Badge } from "~/shared/components";
import { EllipsisIcon } from "lucide-react";
import { formatter } from "~/shared/lib/formatter";
import type { Employee } from "~/shared/types/domain";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "fullName",
    header: "Nome",
    enableSorting: true,
    meta: {
      headerClassName: "md:min-w-[260px]",
    },
  },
  {
    accessorKey: "oabNumber",
    header: "OAB",
    cell: ({ row }) => formatter.oab(row.original.oabNumber ?? ""),
    enableSorting: true,
  },
  {
    accessorKey: "type",
    header: "Cargo",
    cell: ({ row }) => formatter.employeeType(row.original.type),
    enableSorting: true,
  },
  {
    accessorKey: "remunerationPercent",
    header: "Remuneração",
    cell: ({ row }) => formatter.percent(row.original.remunerationPercent),
    enableSorting: true,
  },
  {
    accessorKey: "contractCount",
    header: "Contratos",
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "Perfil",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex gap-1 px-1.5 text-muted-foreground"
      >
        {formatter.employeeRole(row.original.role)}
      </Badge>
    ),
    enableSorting: true,
  },
  {
    id: "actions",
    cell: () => <EllipsisIcon className="size-4" />,
    enableSorting: false,
  },
];
