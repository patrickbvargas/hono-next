"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  type TableProps,
} from "@heroui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type TableOptions,
} from "@tanstack/react-table";
import { cn } from "@heroui/react";
import { Spinner } from "@heroui/spinner";
import { Pagination } from "@heroui/pagination";
import { usePagination, useSort } from "~/shared/hooks";

interface DataTableProps<TData, TValue> extends TableProps {
  columns: ColumnDef<TData, TValue>[] | TableOptions<TData>["columns"];
  data: TData[];
  totalCount: number;
  isLoading?: boolean;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  totalCount,
  isLoading,
  ...props
}: DataTableProps<TData, TValue>) => {
  const { sort, handleSort } = useSort();
  const { pagination, handlePagination } = usePagination();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const pages = Math.ceil(totalCount / pagination.limit);

  const bottomContent = React.useMemo(
    () => (
      <Pagination
        total={pages}
        page={pagination.page}
        onChange={handlePagination}
        loop
        size="sm"
        showControls
        className="place-self-center"
      />
    ),
    [],
  );

  return (
    <Table
      removeWrapper
      isHeaderSticky
      sortDescriptor={sort}
      onSortChange={handleSort}
      selectionMode="single"
      bottomContent={pages > 1 && bottomContent}
      {...props}
    >
      <TableHeader>
        {table.getFlatHeaders().map((header) => (
          <TableColumn
            key={header.id}
            colSpan={header.colSpan}
            allowsSorting={header.column.getCanSort()}
            className={cn(
              "uppercase",
              header.column.columnDef.meta?.headerClassName,
            )}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner />}
        emptyContent={"Nenhum registro encontrado."}
      >
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} className="h-12 cursor-pointer">
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                <span>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
