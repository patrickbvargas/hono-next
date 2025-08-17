"use client";

import { Pagination } from "@heroui/pagination";
import {
	type Column,
	type ColumnDef,
	type TableOptions,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronUpIcon } from "lucide-react";
import * as React from "react";
import { LoadingFallback } from "~/shared/components/loading-fallback";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/shared/components/ui/table";
import { usePagination, useSort } from "~/shared/hooks";
import { cn } from "~/shared/lib/utils";
import type { SortDescriptor } from "~/shared/types/sort";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[] | TableOptions<TData>["columns"];
	data: TData[];
	totalCount: number;
	isLoading?: boolean;
	className?: string;
	onRowAction?: (index: number) => void;
}

export const DataTable = <TData, TValue>({
	columns,
	data,
	totalCount,
	isLoading,
	className,
	onRowAction,
}: DataTableProps<TData, TValue>) => {
	const { sort, handleSort } = useSort();
	const { pagination, handlePagination } = usePagination();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const pages = Math.ceil(totalCount / pagination.limit);

	const handleHeaderClick = (column: Column<TData>) => {
		if (!column.getCanSort()) return;

		const columnId = column.id;
		let direction: "ascending" | "descending" = "ascending";

		if (sort.column === columnId) {
			direction = sort.direction === "ascending" ? "descending" : "ascending";
		}

		handleSort({ column: columnId, direction });
	};

	if (isLoading) {
		return (
			<div className="space-y-3">
				{Array.from({ length: 5 }).map((_, i) => (
					<LoadingFallback key={i} className="h-12" />
				))}
			</div>
		);
	}

	return (
		<div className={cn("space-y-4", className)}>
			<Table>
				<TableHeader>
					<TableRow>
						{table.getFlatHeaders().map((header) => (
							<TableHead
								key={header.id}
								colSpan={header.colSpan}
								onClick={() => handleHeaderClick(header.column)}
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
								className="h-12 cursor-pointer"
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

			{pages > 1 && (
				<div className="flex justify-center">
					<Pagination
						total={pages}
						page={pagination.page}
						onChange={handlePagination}
						loop
						size="sm"
						showControls
					/>
				</div>
			)}
		</div>
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
