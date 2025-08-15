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
import {
  getDefaultFormCreateValues,
  getDefaultFormEditValues,
} from "../../utils/default";
import { useForm } from "react-hook-form";
import { FormSkeleton } from "./skeleton";
import { formatter } from "~/shared/lib/formatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormQuery } from "../../hooks/use-form-query";
import type { Employee } from "~/shared/types/employee";
import { useFormMutation } from "../../hooks/use-form-mutation";
import type { FormModalMode } from "~/shared/hooks/use-form-modal";
import { EMPLOYEE_TYPES, EMPLOYEE_ROLES } from "~/shared/constants/employee";
import { zEmployeeForm, type EmployeeForm } from "~/shared/schemas/employee";

type FormModeOptions = {
  isEdition: boolean;
  title: string;
  buttonLabel: string;
  modalDescription: string;
};

const formModeOptions: Record<FormModalMode, FormModeOptions> = {
  create: {
    isEdition: false,
    title: "Novo Funcionário",
    buttonLabel: "Criar",
    modalDescription: "Criar funcionário?",
  },
  edit: {
    isEdition: true,
    title: "Editar Funcionário",
    buttonLabel: "Salvar",
    modalDescription: "Salvar alterações?",
  },
};

interface FormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: FormModalMode;
  employee?: Partial<Employee>;
}

export const Form = ({ isOpen, onOpenChange, mode, employee }: FormProps) => {
  const modeOptions = formModeOptions[mode];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
          {modeOptions.isEdition && employee?.id ? (
            <React.Suspense fallback={<FormSkeleton />}>
              <FormContent
                mode={mode}
                employee={employee}
                onOpenChange={onOpenChange}
              />
            </React.Suspense>
          ) : (
            <FormContent
              mode={mode}
              employee={employee}
              onOpenChange={onOpenChange}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const FormContent = ({
  mode,
  employee,
  onOpenChange,
}: Omit<FormProps, "isOpen">) => {
  const modeOptions = formModeOptions[mode];

  const { fullEmployee, isEdition } = useFormQuery({ mode, employee });

  const methods = useForm<EmployeeForm>({
    resolver: zodResolver(zEmployeeForm),
    defaultValues:
      isEdition && fullEmployee
        ? getDefaultFormEditValues(fullEmployee)
        : getDefaultFormCreateValues(),
  });

  const modalConfirm = useDisclosure();
  const type = methods.watch("type");

  const { handleFormSubmit, isSubmitting } = useFormMutation({
    mode,
    onOpenChange,
    methods,
  });

  const onConfirmSubmit = async (data: EmployeeForm) => {
    modalConfirm.onClose();
    await handleFormSubmit(data);
  };

  React.useEffect(() => {
    if (type === "admin_assistant") methods.setValue("oabNumber", "");
  }, [type]);

  return (
    <>
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
          <Button variant="light" onPress={() => onOpenChange(false)}>
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
    </>
  );
};
