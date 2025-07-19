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
import { FeeTable } from "./components/table";
import { FeeFilter } from "./components/filter";
import { FeeDetails } from "./components/details";
import type { FeeSummary } from "~/shared/types/fee";

interface FeeListProps {
  fees: FeeSummary[];
  count: number;
}

export const FeeList = ({ fees, count }: FeeListProps) => {
  const { isOpen, onOpenChange, selectedItem, onRowAction } =
    useEntityDetails<FeeSummary>(fees);

  return (
    <Wrapper title={ROUTES.fee.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Processo ou Cliente..." />
        <FeeFilter />
      </WrapperHeader>
      <WrapperBody>
        <FeeTable fees={fees} totalCount={count} onRowAction={onRowAction} />
        <FeeDetails
          fee={selectedItem}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </WrapperBody>
    </Wrapper>
  );
};
