import * as React from "react";
import { useDisclosure } from "@heroui/react";

// TODO: remove export after refactoring all entities
export function useEntityPanel<T>() {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = React.useState<T | null>(null);

  const selectItem = React.useCallback(
    (item: T | undefined) => {
      setSelectedItem(item || null);
      if (item) onOpen();
    },
    [onOpen],
  );

  const clearSelection = React.useCallback(() => {
    setSelectedItem(null);
    onClose();
  }, [onClose]);

  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
    selectedItem,
    selectItem,
    clearSelection,
  };
}
