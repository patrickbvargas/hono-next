"use client";

import * as React from "react";
import {
  RHFForm,
  RHFInput,
  RHFFieldset,
  ModalConfirm,
  EntityForm,
  EntityFormHeader,
  EntityFormBody,
  EntityFormFooter,
  EntityFormActions,
  SuspenseBoundary,
  EntityFormTitle,
  RHFRadioGroup,
} from "~/shared/components";
import { FormSkeleton } from "./skeleton";
import { useDisclosure } from "~/shared/hooks";
import { useForm } from "../../hooks/use-form";
import { formatter } from "~/shared/lib/formatter";
import { FORM_MODE_OPTIONS } from "../../constants/form";
import { CLIENT_TYPES } from "~/shared/constants";
import { type ClientForm } from "~/shared/schemas/client";
import type { FormModalMode } from "~/shared/types/form-modal";
import { useModal, useModalActions } from "../../stores/use-modal";

export const Form = () => {
  const { isOpen, mode, id } = useModal();
  const { onOpenChange } = useModalActions();

  const shouldShow = isOpen && (mode === "create" || mode === "edit");

  if (!shouldShow) return null;

  return (
    <EntityForm open={true} onOpenChange={onOpenChange}>
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

  const type = methods.watch("type");

  const onConfirmSubmit = async (data: ClientForm) => {
    modalConfirm.onClose();
    await handleSubmit(data);
  };

  return (
    <React.Fragment>
      <EntityFormHeader>
        <EntityFormTitle>{modeOptions.title}</EntityFormTitle>
      </EntityFormHeader>
      <EntityFormBody>
        <RHFForm submitCallback={modalConfirm.onOpen} {...methods} showDebug>
          <RHFFieldset className="grid grid-cols-2">
            <RHFRadioGroup<ClientForm>
              name="type"
              label="Tipo"
              orientation="horizontal"
              items={CLIENT_TYPES.map((type) => ({
                value: type,
                label: formatter.clientType(type),
              }))}
              classNames={{
                wrapper: "col-span-full",
              }}
            />
            <RHFInput<ClientForm>
              name="fullName"
              label="Nome"
              placeholder="Digite o nome completo"
              isRequired
            />
            <RHFInput<ClientForm>
              name="cnpjf"
              label={type === "pf" ? "CPF" : "CNPJ"}
              placeholder={
                type === "pf" ? "000.000.000-00" : "00.000.000/0000-00"
              }
              isRequired
            />
          </RHFFieldset>
          <RHFFieldset className="grid grid-cols-2">
            <RHFInput<ClientForm>
              name="email"
              label="Email"
              type="email"
              placeholder="email@exemplo.com"
            />
            <RHFInput<ClientForm>
              name="mobilePhone"
              label="Telefone"
              placeholder="(00) 00000-0000"
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
