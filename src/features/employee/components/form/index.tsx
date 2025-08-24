"use client";

import * as React from "react";
import {
  RHFForm,
  RHFInput,
  RHFNumber,
  RHFFieldset,
  RHFSelect,
  ModalConfirm,
  EntityForm,
  EntityFormHeader,
  EntityFormBody,
  EntityFormFooter,
  EntityFormActions,
  SuspenseBoundary,
  EntityFormTitle,
  RHFDivider,
} from "~/shared/components";
import { FormSkeleton } from "./skeleton";
import { useDisclosure } from "~/shared/hooks";
import { useForm } from "../../hooks/use-form";
import { formatter } from "~/shared/lib/formatter";
import { FORM_MODE_OPTIONS } from "../../constants/form";
import { type EmployeeForm } from "~/shared/schemas/employee";
import type { FormModalMode } from "~/shared/types/form-modal";
import { useModal, useModalActions } from "../../stores/use-modal";
import { EMPLOYEE_TYPES, EMPLOYEE_ROLES } from "~/shared/constants";

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

  const onConfirmSubmit = async (data: EmployeeForm) => {
    modalConfirm.onClose();
    await handleSubmit(data);
  };

  React.useEffect(() => {
    if (
      type === "admin_assistant" &&
      methods.formState.defaultValues?.type !== type
    )
      methods.setValue("oabNumber", "");
  }, [type]);

  return (
    <React.Fragment>
      <EntityFormHeader>
        <EntityFormTitle>{modeOptions.title}</EntityFormTitle>
      </EntityFormHeader>
      <EntityFormBody>
        <RHFForm submitCallback={modalConfirm.onOpen} {...methods} showDebug>
          <RHFFieldset className="grid grid-cols-2">
            <RHFInput<EmployeeForm>
              name="fullName"
              label="Nome"
              placeholder="Digite o nome completo"
              isRequired
            />
            <RHFInput<EmployeeForm>
              name="email"
              label="Email"
              type="email"
              placeholder="email@exemplo.com"
              isRequired
            />
            <RHFSelect<EmployeeForm>
              name="type"
              label="Função"
              placeholder="Selecione a função"
              isRequired
              items={EMPLOYEE_TYPES.map((type) => ({
                value: type,
                label: formatter.employeeType(type),
              }))}
            />
            <RHFInput<EmployeeForm>
              name="oabNumber"
              label="OAB"
              placeholder="RS000000"
              isRequired={type === "lawyer"}
              isDisabled={type !== "lawyer"}
            />
            <RHFSelect<EmployeeForm>
              name="role"
              label="Perfil"
              placeholder="Selecione o perfil"
              isRequired
              items={EMPLOYEE_ROLES.map((role) => ({
                value: role,
                label: formatter.employeeRole(role),
              }))}
            />
          </RHFFieldset>
          <RHFDivider />
          <RHFFieldset className="grid grid-cols-2">
            <RHFNumber<EmployeeForm>
              name="remunerationPercent"
              label="% Remuneração"
              minValue={0}
              maxValue={1}
              step={0.05}
              isRequired
              formatOptions={{
                style: "percent",
              }}
            />
            <RHFNumber<EmployeeForm>
              name="referrerPercent"
              label="% Indicação"
              minValue={0}
              maxValue={1}
              step={0.05}
              isRequired
              formatOptions={{
                style: "percent",
              }}
            />
          </RHFFieldset>
          {!modeOptions.isEdition && (
            <React.Fragment>
              <RHFDivider />
              <RHFFieldset className="grid grid-cols-2">
                <RHFInput<EmployeeForm>
                  name="password"
                  type="password"
                  label="Senha"
                  placeholder="Mínimo 6 caracteres"
                  isRequired={!modeOptions.isEdition}
                />
              </RHFFieldset>
            </React.Fragment>
          )}
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
