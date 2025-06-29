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
import {
  EllipsisIcon,
  PencilLineIcon,
  SquareArrowOutUpRightIcon,
  TrashIcon,
} from "lucide-react";
import { ROUTES } from "~/shared/constants/route";
import { formatter } from "~/shared/lib/formatter";
import type { Client } from "~/shared/types/client";
import { createColumnHelper } from "@tanstack/react-table";
import { CLIENT_SORT_COLUMNS } from "~/shared/constants/client";

const isSortable = (column: keyof Client) =>
  CLIENT_SORT_COLUMNS.includes(column as (typeof CLIENT_SORT_COLUMNS)[number]);

const columnHelper = createColumnHelper<Client>();
export const columns = [
  columnHelper.accessor("fullName", {
    header: "Nome",
    cell: ({ row }) => (
      <Link
        href={`${ROUTES.client.url}/${row.original.slug}`}
        size="sm"
        underline="hover"
        color="foreground"
        className="py-1.5"
      >
        {row.original.fullName}
      </Link>
    ),
    enableSorting: isSortable("fullName"),
  }),
  columnHelper.accessor("cnpjf", {
    header: "CNPJF",
    cell: ({ row }) => formatter.cnpjf(row.original.cnpjf ?? ""),
    enableSorting: isSortable("cnpjf"),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    enableSorting: isSortable("email"),
  }),
  columnHelper.accessor("contractCount", {
    header: "Contratos",
    enableSorting: isSortable("contractCount"),
  }),
  columnHelper.accessor("type", {
    header: "Tipo",
    cell: ({ row }) => (
      <Chip size="sm">{formatter.clientType(row.original.type)}</Chip>
    ),
    enableSorting: isSortable("type"),
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
          <DropdownItem
            key="view"
            href={`${ROUTES.client.url}/${row.original.slug}`}
            startContent={
              <SquareArrowOutUpRightIcon size={16} className="opacity-60" />
            }
          >
            Visualizar
          </DropdownItem>
          <DropdownItem
            key="edit"
            startContent={<PencilLineIcon size={16} className="opacity-60" />}
          >
            Editar
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<TrashIcon size={16} className="opacity-60" />}
          >
            Excluir
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ),
  }),
];
