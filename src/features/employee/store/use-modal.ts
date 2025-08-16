import {
  createEntityModalStore,
  createEntityModalHooks,
} from "~/shared/stores/entity-modal";

// Create employee-specific modal store using the generic factory
const useEmployeeModalStore = createEntityModalStore();

// Create typed hooks for employee modal
const employeeModalHooks = createEntityModalHooks(useEmployeeModalStore);

// Export individual selectors for maximum stability
export const useEmployeeModalIsOpen = employeeModalHooks.useIsOpen;
export const useEmployeeModalMode = employeeModalHooks.useMode;
export const useEmployeeModalId = employeeModalHooks.useId;

export const useEmployeeModalOpenCreateModal =
  employeeModalHooks.useOpenCreateModal;
export const useEmployeeModalOpenEditModal =
  employeeModalHooks.useOpenEditModal;
export const useEmployeeModalOpenViewModal =
  employeeModalHooks.useOpenViewModal;
export const useEmployeeModalCloseModal = employeeModalHooks.useCloseModal;
export const useEmployeeModalOnOpenChange = employeeModalHooks.useOnOpenChange;

// Convenience hooks for backward compatibility
export const useEmployeeModalState = employeeModalHooks.useState;
export const useEmployeeModalActions = employeeModalHooks.useActions;
