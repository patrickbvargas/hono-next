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
import { RemunerationTable } from "./components/table";
import { RemunerationFilter } from "./components/filter";
import { RemunerationDetails } from "./components/details";
import type { Remuneration } from "~/shared/types/remuneration";

interface RemunerationListProps {
  remunerations: Remuneration[];
  count: number;
}

export const RemunerationList = ({
  remunerations,
  count,
}: RemunerationListProps) => {
  const { isOpen, onOpenChange, selectedItem, handleSelectItem } =
    useEntityDetails<Remuneration>();

  return (
    <Wrapper title={ROUTES.remuneration.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Processo ou Funcionário..." />
        <RemunerationFilter />
      </WrapperHeader>
      <WrapperBody>
        <RemunerationTable
          remunerations={remunerations}
          totalCount={count}
          onSelectRemuneration={handleSelectItem}
        />
        <RemunerationDetails
          remuneration={selectedItem}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </WrapperBody>
    </Wrapper>
  );
};
