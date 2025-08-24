"use client";

import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  WrapperFooter,
  Search,
  ButtonNew,
  PaginationControl,
} from "~/shared/components";
import { Form } from "./components/form";
import { Table } from "./components/table";
import { ROUTES } from "~/shared/constants";
import { Filter } from "./components/filter";
import { useModalActions } from "./stores/use-modal";
import type { ClientSummary } from "~/shared/types/client";

interface ClientListProps {
  clients: ClientSummary[];
  count: number;
}

export const ClientList = ({ clients, count }: ClientListProps) => {
  const { openCreateModal } = useModalActions();

  return (
    <Wrapper title={ROUTES.client.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Nome..." />
        <Filter />
        <ButtonNew onClick={openCreateModal} />
      </WrapperHeader>
      <WrapperBody>
        <Table clients={clients} />
        <Form />
      </WrapperBody>
      <WrapperFooter>
        <PaginationControl totalRecords={count} />
      </WrapperFooter>
    </Wrapper>
  );
};
