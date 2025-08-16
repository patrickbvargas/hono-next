"use client";

import { useForm } from "react-hook-form";
import { filterParser } from "../parsers";
import { useDisclosure } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaultFilterValues } from "../utils/default";
import { useFilter as useFilterShared } from "~/shared/hooks";
import { zEmployeeFilter, type EmployeeFilter } from "../schemas/filter";

export function useFilter() {
  const { isOpen, onOpenChange, onClose } = useDisclosure();
  const { filters, handleFilters } = useFilterShared(filterParser);

  const methods = useForm<EmployeeFilter>({
    resolver: zodResolver(zEmployeeFilter),
    values: filters,
    defaultValues: getDefaultFilterValues(),
  });

  const handleFormSubmit = (data: EmployeeFilter) => {
    handleFilters(data);
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) methods.reset(filters);
    onOpenChange();
  };

  return {
    methods,
    isOpen,
    onClose,
    handleOpenChange,
    handleFormSubmit,
    filters,
  };
}
