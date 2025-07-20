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
  type EntityPanelProps,
} from "~/shared/components";
import { api } from "~/trpc/client";
import { Spinner } from "@heroui/react";
import { ROUTES } from "~/shared/constants/route";
import { formatter } from "~/shared/lib/formatter";
import { searchSerializer } from "~/shared/lib/nuqs";
import type { EntityPanelData } from "~/shared/types/entity-data";

interface ClientDetailsProps extends EntityPanelProps {
  id: string;
}

export const ClientDetails = ({ id, ...props }: ClientDetailsProps) => {
  return (
    <EntityPanel {...props}>
      <React.Suspense fallback={<Spinner />}>
        <ClientDetailsContent id={id} />
      </React.Suspense>
    </EntityPanel>
  );
};

interface ClientDetailsContentProps {
  id: string;
}

const ClientDetailsContent = ({ id }: ClientDetailsContentProps) => {
  const [client] = api.clients.getOne.useSuspenseQuery({ id });

  const clientData: EntityPanelData[] = React.useMemo(() => {
    const generalSection: EntityPanelData = {
      title: "Informações Gerais",
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
