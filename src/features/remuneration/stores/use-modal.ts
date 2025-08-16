import {
  createEntityModalStore,
  createEntityModalHooks,
} from "~/shared/stores/entity-modal";

// Create remuneration-specific modal store using the generic factory
const useModalStore = createEntityModalStore();

// Create typed hooks for remuneration modal
const modalHooks = createEntityModalHooks(useModalStore);

// Simplified API - 3 focused hooks (generic names within feature context)
export const useModal = modalHooks.useState;
export const useModalActions = modalHooks.useActions;
export const useModalCallbacks = () => ({
  onOpenChange: modalHooks.useOnOpenChange(),
});