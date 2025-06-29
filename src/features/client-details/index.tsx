import * as React from "react";
import {
  Wrapper,
  WrapperHeader,
  WrapperBody,
  WrapperTitle,
} from "~/shared/components";
import { formatter } from "~/shared/lib/formatter";
import type { Client } from "~/shared/types/client";
import type { ClientData } from "./types/client-data";
import { ClientDataDisplay } from "./components/display";

interface ClientDetailsProps {
  client: Client;
}

export const ClientDetails = async ({ client }: ClientDetailsProps) => {
  const clientData: ClientData = {
    identification: [
      {
        term: "Tipo",
        definition: formatter.clientType(client.type),
      },
      {
        term: "CNPJF",
        definition: formatter.cnpjf(client.cnpjf),
      },
    ],
    contact: [
      {
        term: "Celular",
        definition: client.mobilePhone,
      },
      {
        term: "Email",
        definition: client.email,
      },
    ],
    details: [
      {
        term: "Contratos",
        definition: client.contractCount,
      },
      {
        term: "Status",
        definition: formatter.entityStatus(client.status),
      },
    ],
  };

  return (
    <Wrapper>
      <WrapperHeader>
        <WrapperTitle title={client.fullName} />
      </WrapperHeader>
      <WrapperBody>
        <ClientDataDisplay data={clientData} />
      </WrapperBody>
    </Wrapper>
  );
};
