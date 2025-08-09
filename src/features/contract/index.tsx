import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
} from "~/shared/components";
import { ROUTES } from "~/shared/constants/route";
import { ContractTable } from "./components/table";
import { ContractFilter } from "./components/filter";
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
        <ContractFilter />
      </WrapperHeader>
      <WrapperBody>
        <ContractTable contracts={contracts} totalCount={count} />
      </WrapperBody>
    </Wrapper>
  );
};
