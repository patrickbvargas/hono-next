"use client";

import { create } from "zustand";
import type { EntityModalMode } from "~/shared/types/entity-modal";

interface EntityModalState {
  isOpen: boolean;
  mode: EntityModalMode;
  id: string | undefined;
}

interface EntityModalActions {
  openCreateModal: () => void;
  openEditModal: (entityId: string) => void;
  openViewModal: (entityId: string) => void;
  closeModal: () => void;
  onOpenChange: () => void;
}

interface EntityModalStore extends EntityModalState, EntityModalActions {}

/**
 * Creates a reusable entity modal store for any entity type
 * @returns Zustand store with modal state and actions
 */
export const createEntityModalStore = () => {
  const store = create<EntityModalStore>((set, get) => ({
    // State
    isOpen: false,
    mode: "create",
    id: undefined,

    // Actions
    openCreateModal: () => {
      set({
        mode: "create",
        id: undefined,
        isOpen: true,
      });
    },

    openEditModal: (entityId: string) => {
      set({
        mode: "edit",
        id: entityId,
        isOpen: true,
      });
    },

    openViewModal: (entityId: string) => {
      set({
        mode: "view",
        id: entityId,
        isOpen: true,
      });
    },

    closeModal: () => {
      set({
        isOpen: false,
        id: undefined,
      });
    },

    onOpenChange: () => {
      const { isOpen } = get();
      if (isOpen) {
        set({
          isOpen: false,
          id: undefined,
        });
      }
    },
  }));

  return store;
};

/**
 * Creates typed hooks for entity modal store
 * @param useStore - The zustand store hook created by createEntityModalStore
 * @returns Object with individual selector hooks and convenience hooks
 */
export const createEntityModalHooks = (useStore: ReturnType<typeof createEntityModalStore>) => {
  // Individual selectors for maximum stability
  const useIsOpen = () => useStore((state: EntityModalStore) => state.isOpen);
  const useMode = () => useStore((state: EntityModalStore) => state.mode);
  const useId = () => useStore((state: EntityModalStore) => state.id);

  const useOpenCreateModal = () =>
    useStore((state: EntityModalStore) => state.openCreateModal);
  const useOpenEditModal = () =>
    useStore((state: EntityModalStore) => state.openEditModal);
  const useOpenViewModal = () =>
    useStore((state: EntityModalStore) => state.openViewModal);
  const useCloseModal = () =>
    useStore((state: EntityModalStore) => state.closeModal);
  const useOnOpenChange = () =>
    useStore((state: EntityModalStore) => state.onOpenChange);

  // Convenience hooks for backward compatibility
  const useState = () => ({
    isOpen: useIsOpen(),
    mode: useMode(),
    id: useId(),
  });

  const useActions = () => ({
    openCreateModal: useOpenCreateModal(),
    openEditModal: useOpenEditModal(),
    openViewModal: useOpenViewModal(),
    closeModal: useCloseModal(),
    onOpenChange: useOnOpenChange(),
  });

  return {
    // Individual selectors
    useIsOpen,
    useMode,
    useId,
    useOpenCreateModal,
    useOpenEditModal,
    useOpenViewModal,
    useCloseModal,
    useOnOpenChange,
    // Convenience hooks
    useState,
    useActions,
  };
};
