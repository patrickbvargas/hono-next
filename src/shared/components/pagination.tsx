"use client";

import * as React from "react";
import {
  Pagination as PaginationPrimitive,
  PaginationContent,
  PaginationFeedback,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/shared/components/ui/pagination";
import { cn } from "~/shared/lib/utils";
import { usePagination } from "~/shared/hooks";

interface Props extends React.ComponentProps<typeof PaginationPrimitive> {
  totalRecords: number;
  siblingCount?: number;
}
export const Pagination = ({
  totalRecords = 0,
  siblingCount = 1,
  className,
  ...props
}: Props) => {
  const {
    pagination: { page, limit },
    handlePagination,
  } = usePagination();

  if (totalRecords === 0) return null;

  const totalPages = Math.ceil(totalRecords / limit);
  const totalDisplayPages = 1 + siblingCount * 2;

  const startPage = Math.max(
    1,
    Math.min(page - siblingCount, totalPages - totalDisplayPages + 1),
  );
  const endPage = Math.min(totalPages, startPage + totalDisplayPages - 1);

  const renderPageLinks = () =>
    Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;
      return (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            href="/"
            onClick={() => handlePagination(pageNumber)}
            isActive={pageNumber === page}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    });

  const generateFeedback = () => {
    const initialItem = (page - 1) * limit + 1;
    const finalItem = Math.min(initialItem + limit - 1, totalRecords);
    const entityName = totalRecords === 1 ? "registro" : "registros";
    return `${initialItem}-${finalItem} de ${totalRecords} ${entityName}`;
  };

  const isFirstPreviousDisabled = page <= 1;
  const isLastNextDisabled = page >= totalPages;

  return (
    <PaginationPrimitive
      className={cn(
        "flex flex-col-reverse gap-3 items-center sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      <PaginationFeedback>{generateFeedback()}</PaginationFeedback>
      <PaginationContent>
        <PaginationItem isDisabled={isFirstPreviousDisabled}>
          <PaginationFirst href="/" onClick={() => handlePagination(1)} />
        </PaginationItem>
        <PaginationItem isDisabled={isFirstPreviousDisabled}>
          <PaginationPrevious
            href="/"
            onClick={() => handlePagination(page - 1)}
          />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem isDisabled={isLastNextDisabled}>
          <PaginationNext href="/" onClick={() => handlePagination(page + 1)} />
        </PaginationItem>
        <PaginationItem isDisabled={isLastNextDisabled}>
          <PaginationLast
            href="/"
            onClick={() => handlePagination(totalPages)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationPrimitive>
  );
};
