"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/shared/components/ui/table";
import { cn } from "~/shared/lib/utils";
import { useSort } from "~/shared/hooks";
import { ChevronDownIcon } from "lucide-react";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const DataTable = <TData, TValue>({
  columns,
  data,
}: Props<TData, TValue>) => {
  const { sort, handleSort } = useSort();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className={header.column.columnDef.meta?.headerClassName}
                data-sortable={header.column.getCanSort()}
                data-groupable={header.column.getCanGroup()}
              >
                <div
                  onClick={() => {
                    if (!header.column.getCanSort()) return;
                    handleSort(header.column.id);
                  }}
                  className={cn(
                    "h-full px-2.5 flex items-center gap-2",
                    header.column.getCanSort() && "cursor-pointer",
                  )}
                >
                  <span className="truncate">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </span>
                  {header.column.getCanSort() && sort.column === header.id && (
                    <ChevronDownIcon
                      size={16}
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 opacity-60 transition duration-300",
                        sort.direction === "asc" && "rotate-180",
                      )}
                      data-direction={sort.direction}
                      data-visible={header.column.getIsSorted()}
                    />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cell.column.columnDef.meta?.cellClassName}
                  data-selected={row.getIsSelected()}
                >
                  {cell.getIsAggregated()
                    ? flexRender(
                        cell.column.columnDef.aggregatedCell ??
                          cell.column.columnDef.cell,
                        cell.getContext(),
                      )
                    : flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              Nenhum registro encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
