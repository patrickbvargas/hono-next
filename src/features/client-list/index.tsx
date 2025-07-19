"use client";

import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
} from "~/shared/components";
import { useEntityDetails } from "~/shared/hooks";
import { ROUTES } from "~/shared/constants/route";
import { ClientTable } from "./components/table";
import { ClientFilter } from "./components/filter";
import { ClientDetails } from "./components/details";
import type { ClientSummary } from "~/shared/types/client";

interface ClientListProps {
  clients: ClientSummary[];
  count: number;
}

export const ClientList = ({ clients, count }: ClientListProps) => {
  const { isOpen, onOpenChange, selectedItem, onRowAction } =
    useEntityDetails<ClientSummary>(clients);

  return (
    <Wrapper title={ROUTES.client.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Nome..." />
        <ClientFilter />
      </WrapperHeader>
      <WrapperBody>
        <ClientTable
          clients={clients}
          totalCount={count}
          onRowAction={onRowAction}
        />
        <ClientDetails
          client={selectedItem}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </WrapperBody>
    </Wrapper>
  );
};
