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
import type { FeeSummary } from "~/shared/types/fee";

interface FeeListProps {
  fees: FeeSummary[];
  count: number;
}

export const FeeList = ({ fees, count }: FeeListProps) => {
  return (
    <Wrapper title={ROUTES.fee.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Processo ou Cliente..." />
        <Filter />
      </WrapperHeader>
      <WrapperBody>
        <Table fees={fees} totalCount={count} />
      </WrapperBody>
    </Wrapper>
  );
};
