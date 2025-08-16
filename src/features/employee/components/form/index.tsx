"use client";

import * as React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import {
  RHFForm,
  RHFInput,
  RHFNumber,
  RHFFieldset,
  RHFAutocomplete,
  ModalConfirm,
} from "~/shared/components";
import { FormSkeleton } from "./skeleton";
import { useForm } from "../../hooks/use-form";
import { formatter } from "~/shared/lib/formatter";
import { FORM_MODE_OPTIONS } from "../../constants/form";
import { type EmployeeForm } from "~/shared/schemas/employee";
import type { FormModalMode } from "~/shared/types/form-modal";
import { useModal, useModalActions } from "../../stores/use-modal";
import { EMPLOYEE_TYPES, EMPLOYEE_ROLES } from "~/shared/constants/employee";

export const Form = () => {
  const { isOpen, mode, id } = useModal();
  const { closeModal } = useModalActions();

  const shouldShow = isOpen && (mode === "create" || mode === "edit");

  if (!shouldShow) return null;
  const modeOptions = FORM_MODE_OPTIONS[mode];

  return (
    <Modal
      isOpen={true}
      onOpenChange={closeModal}
      size="xl"
      scrollBehavior="inside"
      classNames={{
        header: "border-b border-divider",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">{modeOptions.title}</h2>
        </ModalHeader>
        <ModalBody className="py-6">
          <React.Suspense fallback={<FormSkeleton />}>
            <FormContent mode={mode} id={id} />
          </React.Suspense>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const FormContent = ({ mode, id }: { mode: FormModalMode; id?: string }) => {
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
      <RHFForm submitCallback={modalConfirm.onOpen} {...methods} showDebug>
        <RHFFieldset title="Geral" className="grid grid-cols-6">
          <RHFInput<EmployeeForm>
            name="fullName"
            label="Nome"
            placeholder="Digite o nome completo"
            isRequired
            className="col-span-3"
          />
          <RHFInput<EmployeeForm>
            name="email"
            label="Email"
            type="email"
            placeholder="email@exemplo.com"
            isRequired
            className="col-span-3"
          />
          <RHFAutocomplete.Root<EmployeeForm>
            name="type"
            label="Função"
            placeholder="Selecione a função"
            isRequired
            className="col-span-2"
          >
            {EMPLOYEE_TYPES.map((type) => (
              <RHFAutocomplete.Item key={type}>
                {formatter.employeeType(type)}
              </RHFAutocomplete.Item>
            ))}
          </RHFAutocomplete.Root>
          <RHFInput<EmployeeForm>
            name="oabNumber"
            label="OAB"
            placeholder="RS000000"
            isRequired={type === "lawyer"}
            isDisabled={type !== "lawyer"}
            className="col-span-2"
          />
          <RHFAutocomplete.Root<EmployeeForm>
            name="role"
            label="Perfil"
            placeholder="Selecione o perfil"
            isRequired
            className="col-span-2"
          >
            {EMPLOYEE_ROLES.map((role) => (
              <RHFAutocomplete.Item key={role}>
                {formatter.employeeRole(role)}
              </RHFAutocomplete.Item>
            ))}
          </RHFAutocomplete.Root>
        </RHFFieldset>
        <RHFFieldset title="Financeiro" className="grid grid-cols-2">
          <RHFNumber<EmployeeForm>
            name="remunerationPercent"
            label="% Remuneração"
            placeholder="0"
            formatOptions={{
              style: "percent",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }}
            minValue={0}
            maxValue={1}
            step={0.05}
            isRequired
            labelPlacement="outside"
          />
          <RHFNumber<EmployeeForm>
            name="referrerPercent"
            label="% Indicação"
            placeholder="0"
            formatOptions={{
              style: "percent",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }}
            minValue={0}
            maxValue={1}
            step={0.05}
            isRequired
            labelPlacement="outside"
          />
        </RHFFieldset>
        {!modeOptions.isEdition && (
          <RHFFieldset title="Acesso" className="grid grid-cols-2">
            <RHFInput<EmployeeForm>
              name="password"
              type="password"
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              isRequired={!modeOptions.isEdition}
            />
          </RHFFieldset>
        )}
        <div className="flex justify-end gap-2 border-t border-divider pt-4">
          <Button variant="light" onPress={closeModal}>
            Cancelar
          </Button>
          <Button
            color="primary"
            type="submit"
            form="rhf-form"
            isLoading={isSubmitting}
            isDisabled={!methods.formState.isDirty}
          >
            {modeOptions.buttonLabel}
          </Button>
        </div>
      </RHFForm>
      <ModalConfirm
        onConfirm={methods.handleSubmit(onConfirmSubmit)}
        description={modeOptions.modalDescription}
        {...modalConfirm}
      />
    </React.Fragment>
  );
};
