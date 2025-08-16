import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
} from "~/shared/components";
import { Table } from "./components/table";
import { Filter } from "./components/filter";
import { ROUTES } from "~/shared/constants/route";
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
        <Table contracts={contracts} totalCount={count} />
      </WrapperBody>
    </Wrapper>
  );
};
