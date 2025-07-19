import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
} from "~/shared/components";
import { ROUTES } from "~/shared/constants/route";
import { ClientTable } from "./components/table";
import { ClientFilter } from "./components/filter";
import type { ClientSummary } from "~/shared/types/client";

interface ClientListProps {
  clients: ClientSummary[];
  count: number;
}

export const ClientList = ({ clients, count }: ClientListProps) => {
  return (
    <Wrapper title={ROUTES.client.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Nome..." />
        <ClientFilter />
      </WrapperHeader>
      <WrapperBody>
        <ClientTable clients={clients} totalCount={count} />
      </WrapperBody>
    </Wrapper>
  );
};
