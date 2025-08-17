"use client";

import * as React from "react";
import {
  RHFForm,
  RHFInput,
  RHFFieldset,
  RHFAutocomplete,
  ModalConfirm,
  EntityForm,
  EntityFormHeader,
  EntityFormBody,
  EntityFormFooter,
  EntityFormActions,
  SuspenseBoundary,
} from "~/shared/components";
import { FormSkeleton } from "./skeleton";
import { useDisclosure } from "@heroui/react";
import { useForm } from "../../hooks/use-form";
import { formatter } from "~/shared/lib/formatter";
import { FORM_MODE_OPTIONS } from "../../constants/form";
import { CLIENT_TYPES } from "~/shared/constants/client";
import { type ClientForm } from "~/shared/schemas/client";
import type { FormModalMode } from "~/shared/types/form-modal";
import { useModal, useModalActions } from "../../stores/use-modal";

export const Form = () => {
  const { isOpen, mode, id } = useModal();
  const { onOpenChange } = useModalActions();

  const shouldShow = isOpen && (mode === "create" || mode === "edit");

  if (!shouldShow) return null;

  return (
    <EntityForm isOpen={true} onOpenChange={onOpenChange}>
      <SuspenseBoundary fallback={<FormSkeleton />}>
        <FormContent mode={mode} id={id} />
      </SuspenseBoundary>
    </EntityForm>
  );
};

interface FormContentProps {
  mode: FormModalMode;
  id?: string;
}
const FormContent = ({ mode, id }: FormContentProps) => {
  const { closeModal } = useModalActions();
  const modeOptions = FORM_MODE_OPTIONS[mode];

  const { methods, handleSubmit, isSubmitting } = useForm({
    mode,
    id,
  });

  const modalConfirm = useDisclosure();

  const onConfirmSubmit = async (data: ClientForm) => {
    modalConfirm.onClose();
    await handleSubmit(data);
  };

  return (
    <React.Fragment>
      <EntityFormHeader>{modeOptions.title}</EntityFormHeader>
      <EntityFormBody>
        <RHFForm submitCallback={modalConfirm.onOpen} {...methods} showDebug>
          <RHFFieldset title="Geral" className="grid grid-cols-6 gap-4">
            <RHFInput<ClientForm>
              name="fullName"
              label="Nome"
              placeholder="Digite o nome completo"
              isRequired
              className="col-span-3"
            />
            <RHFInput<ClientForm>
              name="cnpjf"
              label="CNPJ/CPF"
              placeholder="00.000.000/0000-00 ou 000.000.000-00"
              isRequired
              className="col-span-3"
            />
            <RHFAutocomplete.Root<ClientForm>
              name="type"
              label="Tipo"
              placeholder="Selecione o tipo"
              isRequired
              className="col-span-2"
            >
              {CLIENT_TYPES.map((type) => (
                <RHFAutocomplete.Item key={type}>
                  {formatter.clientType(type)}
                </RHFAutocomplete.Item>
              ))}
            </RHFAutocomplete.Root>
          </RHFFieldset>
          <RHFFieldset title="Contato" className="grid grid-cols-6 gap-4">
            <RHFInput<ClientForm>
              name="email"
              label="Email"
              type="email"
              placeholder="email@exemplo.com"
              className="col-span-2"
            />
            <RHFInput<ClientForm>
              name="mobilePhone"
              label="Telefone"
              placeholder="(00) 00000-0000"
              className="col-span-2"
            />
          </RHFFieldset>
        </RHFForm>
      </EntityFormBody>
      <EntityFormFooter>
        <EntityFormActions
          onCancel={closeModal}
          submitButtonLabel={modeOptions.buttonLabel}
          isLoading={isSubmitting}
          isDisabled={!methods.formState.isDirty}
        />
      </EntityFormFooter>
      <ModalConfirm
        onConfirm={methods.handleSubmit(onConfirmSubmit)}
        description={modeOptions.modalDescription}
        {...modalConfirm}
      />
    </React.Fragment>
  );
};
