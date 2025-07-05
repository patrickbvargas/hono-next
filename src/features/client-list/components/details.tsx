import * as React from "react";
import {
  ChipStatus,
  EntityPanel,
  EntityPanelAccordion,
  EntityPanelActions,
  EntityPanelBody,
  EntityPanelFooter,
  EntityPanelHeader,
} from "~/shared/components";
import { formatter } from "~/shared/lib/formatter";
import type { Client } from "~/shared/types/client";
import type { EntityPanelData } from "~/shared/types/entity-data";

interface ClientDetailsProps
  extends Omit<React.ComponentProps<typeof EntityPanel>, "children"> {
  client: Client | null;
}

export const ClientDetails = ({ client, ...props }: ClientDetailsProps) => {
  if (!client) return null;

  const clientData: EntityPanelData[] = [
    {
      title: "Identificação",
      data: [
        {
          term: "Tipo",
          definition: formatter.clientType(client.type),
        },
        {
          term: "CNPJF",
          definition: formatter.cnpjf(client.cnpjf),
        },
      ],
    },
    {
      title: "Contato",
      data: [
        {
          term: "Celular",
          definition: client.mobilePhone,
        },
        {
          term: "Email",
          definition: client.email,
        },
      ],
    },
    {
      title: "Detalhes",
      data: [
        {
          term: "Contratos",
          definition: client.contractCount,
        },
        {
          term: "Status",
          definition: <ChipStatus status={client.status} />,
        },
      ],
    },
  ];

  return (
    <EntityPanel {...props}>
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
    </EntityPanel>
  );
};
