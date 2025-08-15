"use client";

import { create } from "zustand";
import type { EntityModalMode } from "~/shared/types/form-modal";

interface EmployeeModalState {
  isOpen: boolean;
  mode: EntityModalMode;
  id: string | undefined;
}

interface EmployeeModalActions {
  openCreateModal: () => void;
  openEditModal: (entityId: string) => void;
  openViewModal: (entityId: string) => void;
  closeModal: () => void;
  onOpenChange: () => void;
}

interface EmployeeModalStore extends EmployeeModalState, EmployeeModalActions {}

const useEmployeeModalStore = create<EmployeeModalStore>((set, get) => ({
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

// Individual selectors for maximum stability
export const useEmployeeModalIsOpen = () => useEmployeeModalStore((state) => state.isOpen);
export const useEmployeeModalMode = () => useEmployeeModalStore((state) => state.mode);
export const useEmployeeModalId = () => useEmployeeModalStore((state) => state.id);

export const useEmployeeModalOpenCreateModal = () => useEmployeeModalStore((state) => state.openCreateModal);
export const useEmployeeModalOpenEditModal = () => useEmployeeModalStore((state) => state.openEditModal);
export const useEmployeeModalOpenViewModal = () => useEmployeeModalStore((state) => state.openViewModal);
export const useEmployeeModalCloseModal = () => useEmployeeModalStore((state) => state.closeModal);
export const useEmployeeModalOnOpenChange = () => useEmployeeModalStore((state) => state.onOpenChange);

// Convenience hooks for backward compatibility
export const useEmployeeModalState = () => ({
  isOpen: useEmployeeModalIsOpen(),
  mode: useEmployeeModalMode(),
  id: useEmployeeModalId(),
});

export const useEmployeeModalActions = () => ({
  openCreateModal: useEmployeeModalOpenCreateModal(),
  openEditModal: useEmployeeModalOpenEditModal(),
  openViewModal: useEmployeeModalOpenViewModal(),
  closeModal: useEmployeeModalCloseModal(),
  onOpenChange: useEmployeeModalOnOpenChange(),
});
