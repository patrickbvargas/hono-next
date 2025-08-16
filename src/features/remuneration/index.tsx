import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
} from "~/shared/components";
import { ROUTES } from "~/shared/constants/route";
import { Table } from "./components/table";
import { Filter } from "./components/filter";
import type { RemunerationSummary } from "~/shared/types/remuneration";

interface RemunerationListProps {
  remunerations: RemunerationSummary[];
  count: number;
}

export const RemunerationList = ({
  remunerations,
  count,
}: RemunerationListProps) => {
  return (
    <Wrapper title={ROUTES.remuneration.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Processo ou Funcionário..." />
        <Filter />
      </WrapperHeader>
      <WrapperBody>
        <Table remunerations={remunerations} totalCount={count} />
      </WrapperBody>
    </Wrapper>
  );
};
