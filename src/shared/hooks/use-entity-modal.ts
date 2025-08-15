"use client";

import * as React from "react";
import { useDisclosure } from "@heroui/react";
import type { EntityModalMode } from "~/shared/types/form-modal";

export function useEntityModal() {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = React.useState<EntityModalMode>("create");
  const [id, setId] = React.useState<string | undefined>();

  const openCreateModal = React.useCallback(() => {
    setMode("create");
    setId(undefined);
    onOpen();
  }, [onOpen]);

  const openEditModal = React.useCallback(
    (entityId: string) => {
      setMode("edit");
      setId(entityId);
      onOpen();
    },
    [onOpen],
  );


  const openViewModal = React.useCallback(
    (entityId: string) => {
      setMode("view");
      setId(entityId);
      onOpen();
    },
    [onOpen],
  );

  const closeModal = React.useCallback(() => {
    setId(undefined);
    onClose();
  }, [onClose]);

  return {
    isOpen,
    onOpenChange,
    mode,
    id,
    openCreateModal,
    openEditModal,
    openViewModal,
    closeModal,
  };
}
