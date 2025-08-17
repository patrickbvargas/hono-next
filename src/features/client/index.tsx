"use client";

import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
} from "~/shared/components";
import { Plus } from "lucide-react";
import { Button } from "@heroui/react";
import { Form } from "./components/form";
import { Table } from "./components/table";
import { Filter } from "./components/filter";
import { ROUTES } from "~/shared/constants/route";
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
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onPress={openCreateModal}
        >
          Novo
        </Button>
      </WrapperHeader>
      <WrapperBody>
        <Table clients={clients} totalCount={count} />
      </WrapperBody>
      <Form />
    </Wrapper>
  );
};
