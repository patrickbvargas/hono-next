"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFeedback,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./";
import { cn } from "~/shared/lib/utils";
import { usePagination } from "~/shared/hooks";

const DEFAULT_SIBLING_COUNT = 1;
const MIN_PAGES_FOR_ELLIPSIS = 5; // Formula: 1 + (siblingCount * 2) + 2 = visible pages + buffer

interface PaginationProps extends React.ComponentProps<typeof Pagination> {
  totalRecords: number;
  siblingCount?: number;
  showFirstAndLastPage?: boolean;
  showNextPrevious?: boolean;
  maxDisplayedPages?: number;
}
export const PaginationControl = ({
  totalRecords = 0,
  siblingCount = DEFAULT_SIBLING_COUNT,
  showFirstAndLastPage = true,
  showNextPrevious = true,
  maxDisplayedPages,
  className,
  ...props
}: PaginationProps) => {
  const { pagination, handlePagination } = usePagination();

  if (totalRecords <= 0 || pagination.limit <= 0) return null;

  const totalPages = Math.ceil(totalRecords / pagination.limit);

  const validatedSiblingCount = maxDisplayedPages
    ? Math.max(0, Math.min(siblingCount, Math.floor(maxDisplayedPages / 2) - 1))
    : siblingCount;

  const totalDisplayPages = 1 + validatedSiblingCount * 2;
  const startPage = Math.max(
    1,
    Math.min(
      pagination.page - validatedSiblingCount,
      totalPages - totalDisplayPages + 1,
    ),
  );
  const endPage = Math.min(totalPages, startPage + totalDisplayPages - 1);

  const renderPageLinks = () => {
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;
      return (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            href="#"
            onClick={() => handlePagination(pageNumber)}
            isActive={pageNumber === pagination.page}
            aria-label={`Ir para a página ${pageNumber}`}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  const generateFeedback = () => {
    const initialItem = (pagination.page - 1) * pagination.limit + 1;
    const finalItem = Math.min(
      initialItem + pagination.limit - 1,
      totalRecords,
    );
    const entityName = totalRecords === 1 ? "registro" : "registros";
    return `${initialItem}-${finalItem} de ${totalRecords} ${entityName}`;
  };

  const isFirstPreviousDisabled = pagination.page <= 1;
  const isLastNextDisabled = pagination.page >= totalPages;
  const showLeftEllipsis =
    startPage > 1 && totalPages >= MIN_PAGES_FOR_ELLIPSIS;
  const showRightEllipsis =
    endPage < totalPages && totalPages >= MIN_PAGES_FOR_ELLIPSIS;

  return (
    <Pagination
      className={cn(
        "flex flex-col-reverse gap-3 items-center sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      <PaginationFeedback>{generateFeedback()}</PaginationFeedback>
      <PaginationContent>
        {showFirstAndLastPage && (
          <PaginationItem isDisabled={isFirstPreviousDisabled}>
            <PaginationFirst href="#" onClick={() => handlePagination(1)} />
          </PaginationItem>
        )}

        {showNextPrevious && (
          <PaginationItem isDisabled={isFirstPreviousDisabled}>
            <PaginationPrevious
              href="#"
              onClick={() => handlePagination(pagination.page - 1)}
            />
          </PaginationItem>
        )}

        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {renderPageLinks()}

        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {showNextPrevious && (
          <PaginationItem isDisabled={isLastNextDisabled}>
            <PaginationNext
              href="#"
              onClick={() => handlePagination(pagination.page + 1)}
            />
          </PaginationItem>
        )}

        {showFirstAndLastPage && (
          <PaginationItem isDisabled={isLastNextDisabled}>
            <PaginationLast
              href="#"
              onClick={() => handlePagination(totalPages)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
