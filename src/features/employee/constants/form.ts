import type {
  FormModalMode,
  FormModalOptions,
} from "~/shared/types/form-modal";

export const FORM_MODE_OPTIONS: Record<FormModalMode, FormModalOptions> = {
  create: {
    isEdition: false,
    title: "Novo Funcionário",
    buttonLabel: "Criar",
    modalDescription: "Criar funcionário?",
  },
  edit: {
    isEdition: true,
    title: "Editar Funcionário",
    buttonLabel: "Salvar",
    modalDescription: "Salvar alterações?",
  },
};
