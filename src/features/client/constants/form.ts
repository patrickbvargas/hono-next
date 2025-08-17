import type {
  FormModalMode,
  FormModalOptions,
} from "~/shared/types/form-modal";

export const FORM_MODE_OPTIONS: Record<FormModalMode, FormModalOptions> = {
  create: {
    isEdition: false,
    title: "Novo Cliente",
    buttonLabel: "Criar",
    modalDescription: "Criar cliente?",
  },
  edit: {
    isEdition: true,
    title: "Editar Cliente",
    buttonLabel: "Salvar",
    modalDescription: "Salvar alterações?",
  },
};