import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
  WrapperTitle,
} from "~/shared/components";
import { ClientTable } from "./components/table";
import { ROUTES } from "~/shared/constants/route";
import { ClientFilter } from "./components/filter";
import type { Client } from "~/shared/types/client";

interface ClientListProps {
  clients: Client[];
  count: number;
}

export const ClientList = async ({ clients, count }: ClientListProps) => {
  return (
    <Wrapper>
      <WrapperHeader>
        <WrapperTitle title={ROUTES.client.label} />
      </WrapperHeader>
      <WrapperBody>
        <div className="flex items-center gap-2">
          <Search placeholder="Filtrar por Nome..." />
          <ClientFilter />
        </div>
        <ClientTable data={clients} totalCount={count} />
      </WrapperBody>
    </Wrapper>
  );
};
