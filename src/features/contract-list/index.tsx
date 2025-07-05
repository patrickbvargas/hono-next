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
import { ContractTable } from "./components/table";
import { ContractFilter } from "./components/filter";
import { ContractDetails } from "./components/details";
import type { Contract } from "~/shared/types/contract";

interface ContractListProps {
  contracts: Contract[];
  count: number;
}

export const ContractList = ({ contracts, count }: ContractListProps) => {
  const { isOpen, onOpenChange, selectedItem, handleSelectItem } =
    useEntityDetails<Contract>();

  return (
    <Wrapper title={ROUTES.contract.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Processo, Cliente ou Advogado..." />
        <ContractFilter />
      </WrapperHeader>
      <WrapperBody>
        <ContractTable
          contracts={contracts}
          totalCount={count}
          onSelectContract={handleSelectItem}
        />
        <ContractDetails
          contract={selectedItem}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </WrapperBody>
    </Wrapper>
  );
};
