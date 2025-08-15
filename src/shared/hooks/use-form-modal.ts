"use client";

import * as React from "react";

export type FormModalMode = "create" | "edit";

export function useFormModal<T>() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mode, setMode] = React.useState<FormModalMode>("create");
  const [data, setData] = React.useState<T | undefined>();

  const openCreateModal = () => {
    setMode("create");
    setData(undefined);
    setIsOpen(true);
  };

  const openEditModal = (data: T) => {
    setMode("edit");
    setData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setData(undefined);
  };

  return {
    isOpen,
    mode,
    data,
    openCreateModal,
    openEditModal,
    closeModal,
  };
}
