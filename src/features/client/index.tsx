import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
} from "~/shared/components";
import { ROUTES } from "~/shared/constants/route";
import { Table } from "./components/table";
import { Filter } from "./components/filter";
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
        <Filter />
      </WrapperHeader>
      <WrapperBody>
        <Table clients={clients} totalCount={count} />
      </WrapperBody>
    </Wrapper>
  );
};
