"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { filterParser } from "../parsers";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaultFilterValues } from "../utils/default";
import { useFilter as useFilterShared } from "~/shared/hooks";
import { zEmployeeFilter, type EmployeeFilter } from "../schemas/filter";

export function useFilter() {
  const { filters, handleFilters } = useFilterShared(filterParser);
  const methods = useForm<EmployeeFilter>({
    resolver: zodResolver(zEmployeeFilter),
    values: filters,
    defaultValues: getDefaultFilterValues(),
  });

  const [isOpen, setIsOpen] = React.useState(false);

  const handleFormSubmit = (data: EmployeeFilter) => {
    handleFilters(data);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      methods.reset(filters);
    }
  };

  return {
    methods,
    isOpen,
    setIsOpen,
    handleOpenChange,
    handleFormSubmit,
    filters,
  };
}
