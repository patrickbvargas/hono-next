"use client";

import * as React from "react";
import { useDisclosure } from "@heroui/react";

export function useEntityDetails<T>() {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = React.useState<T | null>(null);

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
  };
}
