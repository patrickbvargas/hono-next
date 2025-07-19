"use client";

import * as React from "react";
import { useDisclosure } from "@heroui/react";

export function useEntityDetails<T>(data: T[]) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = React.useState<T | null>(null);

  const onRowAction = React.useCallback((rowIndex: React.Key) => {
    setSelectedItem(data[Number(rowIndex)] || null);
    onOpen();
  }, []);

  const handleSelectItem = React.useCallback((item: T) => {
    setSelectedItem(item);
    onOpen();
  }, []);

  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
    selectedItem,
    handleSelectItem,
    onRowAction,
  };
}
