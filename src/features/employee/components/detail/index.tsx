"use client";

import * as React from "react";
import {
  AnchorLink,
  ChipStatus,
  EntityPanel,
  EntityPanelAccordion,
  EntityPanelActions,
  EntityPanelBody,
  EntityPanelFooter,
  EntityPanelHeader,
  SuspenseBoundary,
} from "~/shared/components";
import {
  useModal,
  useModalActions,
  useModalCallbacks,
} from "../../stores/use-modal";
import { api } from "~/trpc/client";
import { DetailSkeleton } from "./skeleton";
import { useDisclosure } from "@heroui/react";
import { ROUTES } from "~/shared/constants/route";
import { useDelete } from "../../hooks/use-delete";
import { ModalConfirm } from "~/shared/components";
import { formatter } from "~/shared/lib/formatter";
import { searchSerializer } from "~/shared/lib/nuqs";
import type { EntityPanelData } from "~/shared/types/entity-data";

export const Detail = () => {
  const { isOpen, mode, id } = useModal();
  const { onOpenChange } = useModalCallbacks();

  const shouldShow = isOpen && mode === "view" && id;

  if (!shouldShow) return null;

  return (
    <EntityPanel isOpen={true} onOpenChange={onOpenChange}>
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
          definition: <ChipStatus status={employee.status} />,
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
      <EntityPanelHeader>{employee.fullName}</EntityPanelHeader>
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
