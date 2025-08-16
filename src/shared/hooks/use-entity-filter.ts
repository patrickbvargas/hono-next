"use client";

import z from "zod/v4";
import { useQueryStates } from "nuqs";
import { useDisclosure } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SearchParamsParser } from "../types/nuqs";
import { useForm, type FieldValues } from "react-hook-form";

interface UserFilterParser<T> {
  parser: SearchParamsParser<T>;
  defaultValues: T;
}

interface UseFilterConfig<T extends FieldValues> extends UserFilterParser<T> {
  schema: z.ZodType<T>;
}

export function useEntityFilter<T extends FieldValues>({
  parser,
  schema,
  defaultValues,
}: UseFilterConfig<T>) {
  const { isOpen, onOpenChange, onClose } = useDisclosure();
  const [filters, handleFilters] = useQueryStates(parser, {
    shallow: false,
  });

  // TODO: remove any
  const methods = useForm<T>({
    resolver: zodResolver(schema as any),
    values: filters as T,
    defaultValues: defaultValues as any,
  });

  const handleFormSubmit = (data: T) => {
    handleFilters(data);
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) methods.reset(filters as T);
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
