"use client";

import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  WrapperFooter,
  Search,
  PaginationControl,
} from "~/shared/components";
import { Table } from "./components/table";
import { ROUTES } from "~/shared/constants";
import { Filter } from "./components/filter";
import type { ContractSummary } from "~/shared/types/contract";

interface ContractListProps {
  contracts: ContractSummary[];
  count: number;
}

export const ContractList = ({ contracts, count }: ContractListProps) => {
  return (
    <Wrapper title={ROUTES.contract.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Processo, Cliente ou Advogado..." />
        <Filter />
      </WrapperHeader>
      <WrapperBody>
        <Table contracts={contracts} />
      </WrapperBody>
      <WrapperFooter>
        <PaginationControl totalRecords={count} />
      </WrapperFooter>
    </Wrapper>
  );
};
