"use client";

import * as React from "react";
import {
  AnchorLink,
  EntityStatus,
  EntityPanel,
  EntityPanelAccordion,
  EntityPanelActions,
  EntityPanelBody,
  EntityPanelDescription,
  EntityPanelFooter,
  EntityPanelHeader,
  EntityPanelTitle,
  SuspenseBoundary,
  ModalConfirm,
} from "~/shared/components";
import { api } from "~/trpc/client";
import { ROUTES } from "~/shared/constants";
import { DetailSkeleton } from "./skeleton";
import { useDisclosure } from "~/shared/hooks";
import { useDelete } from "../../hooks/use-delete";
import { formatter } from "~/shared/lib/formatter";
import { searchSerializer } from "~/shared/lib/nuqs";
import type { EntityPanelData } from "~/shared/types/entity-data";
import { useModal, useModalActions } from "../../stores/use-modal";

export const Detail = () => {
  const { isOpen, mode, id } = useModal();
  const { onOpenChange } = useModalActions();

  const shouldShow = isOpen && mode === "view" && id;

  if (!shouldShow) return null;

  return (
    <EntityPanel open={true} onOpenChange={onOpenChange}>
      <SuspenseBoundary fallback={<DetailSkeleton />}>
        <DetailContent id={id} />
      </SuspenseBoundary>
    </EntityPanel>
  );
};

interface DetailContentProps {
  id: string;
}
const DetailContent = ({ id }: DetailContentProps) => {
  const { openEditModal } = useModalActions();
  const [employee] = api.employees.getOne.useSuspenseQuery({ id });

  const { handleDelete } = useDelete({ id });

  const modalConfirm = useDisclosure();

  const employeeData: EntityPanelData[] = React.useMemo(() => {
    const generalSection: EntityPanelData = {
      title: "Informações Gerais",
      data: [
        {
          term: "OAB",
          definition: formatter.oab(employee.oabNumber ?? ""),
        },
        {
          term: "Cargo",
          definition: formatter.employeeType(employee.type),
        },
        {
          term: "Perfil",
          definition: formatter.employeeRole(employee.role),
        },
        {
          term: "Contratos",
          definition: (
            <AnchorLink
              href={`${ROUTES.contract.url}${searchSerializer({
                query: employee.fullName,
              })}`}
            >
              {employee.contractCount}
            </AnchorLink>
          ),
        },
      ],
    };

    const contactSection: EntityPanelData = {
      title: "Contato",
      data: [
        {
          term: "Email",
          definition: employee.email,
        },
      ],
    };

    const financialSection: EntityPanelData = {
      title: "Financeiro",
      data: [
        {
          term: "Remuneração",
          definition: formatter.percent(employee.remunerationPercent),
        },
      ],
    };

    const registerSection: EntityPanelData = {
      title: "Registro",
      data: [
        {
          term: "Status",
          definition: <EntityStatus status={employee.status} />,
        },
        {
          term: "Criado em",
          definition: formatter.timestamp(employee.createdAt),
        },
      ],
    };

    return [generalSection, contactSection, financialSection, registerSection];
  }, [employee]);

  const onConfirmDelete = async () => {
    modalConfirm.onClose();
    await handleDelete();
  };

  return (
    <React.Fragment>
      <EntityPanelHeader>
        <EntityPanelTitle>{employee.fullName}</EntityPanelTitle>
        <EntityPanelDescription>{employee.oabNumber}</EntityPanelDescription>
      </EntityPanelHeader>
      <EntityPanelBody>
        <EntityPanelAccordion data={employeeData} />
      </EntityPanelBody>
      <EntityPanelFooter>
        <EntityPanelActions
          onEdit={() => openEditModal(employee.id)}
          onDelete={modalConfirm.onOpen}
        />
      </EntityPanelFooter>
      <ModalConfirm
        onConfirm={onConfirmDelete}
        description={`Excluir ${employee.fullName}?`}
        {...modalConfirm}
      />
    </React.Fragment>
  );
};
