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
import { useModal, useModalCallbacks } from "../../stores/use-modal";
import { api } from "~/trpc/client";
import { DetailSkeleton } from "./skeleton";
import { ROUTES } from "~/shared/constants/route";
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
  const [client] = api.clients.getOne.useSuspenseQuery({ id });

  const clientData: EntityPanelData[] = React.useMemo(() => {
    const generalSection: EntityPanelData = {
      title: "Informações Gerais",
      data: [
        {
          term: "Tipo",
          definition: formatter.clientType(client.type),
        },
        {
          term: client.type === "pf" ? "CPF" : "CNPJ",
          definition: formatter.cnpjf(client.cnpjf),
        },
        {
          term: "Contratos",
          definition: (
            <AnchorLink
              href={`${ROUTES.contract.url}${searchSerializer({
                query: client.fullName,
              })}`}
            >
              {client.contractCount}
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
          definition: client.email,
        },
        {
          term: "Celular",
          definition: client.mobilePhone,
        },
      ],
    };

    const registerSection: EntityPanelData = {
      title: "Registro",
      data: [
        {
          term: "Status",
          definition: <ChipStatus status={client.status} />,
        },
        {
          term: "Criado em",
          definition: formatter.timestamp(client.createdAt),
        },
      ],
    };

    return [generalSection, contactSection, registerSection];
  }, [client]);

  return (
    <React.Fragment>
      <EntityPanelHeader>{client.fullName}</EntityPanelHeader>
      <EntityPanelBody>
        <EntityPanelAccordion data={clientData} />
      </EntityPanelBody>
      <EntityPanelFooter>
        <EntityPanelActions
          onEdit={() => console.log("edit")}
          onDelete={() => console.log("delete")}
        />
      </EntityPanelFooter>
    </React.Fragment>
  );
};
