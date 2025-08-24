"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type TableOptions,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./";
import { cn } from "~/shared/lib/utils";
import { useSort } from "~/shared/hooks";
import { ChevronUpIcon } from "lucide-react";
import type { SortDescriptor } from "~/shared/types/sort";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[] | TableOptions<TData>["columns"];
  data: TData[];
  className?: string;
  onRowAction?: (index: number) => void;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  onRowAction,
}: DataTableProps<TData, TValue>) => {
  const { sort, handleSort } = useSort();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleColumnSort = (column: Column<TData>) => {
    if (!column.getCanSort()) return;

    const columnId = column.id;
    let direction: "ascending" | "descending" = "ascending";

    if (sort.column === columnId) {
      direction = sort.direction === "ascending" ? "descending" : "ascending";
    }

    handleSort({ column: columnId, direction });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {table.getFlatHeaders().map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              onClick={() => handleColumnSort(header.column)}
              className={header.column.columnDef.meta?.headerClassName}
            >
              <div className="flex items-center">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {header.column.getCanSort() && (
                  <SortIcon column={header.column.id} sort={sort} />
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={row.id}
              onClick={() => onRowAction?.(index)}
              className="cursor-pointer"
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cell.column.columnDef.meta?.cellClassName}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-muted-foreground"
            >
              Nenhum registro encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const SortIcon = ({
  column,
  sort,
}: {
  column: string;
  sort: SortDescriptor;
}) => {
  const isActive = sort.column === column;

  if (!isActive) return null;

  const isDesc = sort.direction === "descending";

  return (
    <div className="ml-2">
      <ChevronUpIcon
        className={cn(
          "size-4 text-primary transition-transform duration-200 ease-in-out",
          isDesc && "rotate-180",
        )}
      />
    </div>
  );
};
