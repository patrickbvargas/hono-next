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
        <Table remunerations={remunerations} />
      </WrapperBody>
      <WrapperFooter>
        <PaginationControl totalRecords={count} />
      </WrapperFooter>
    </Wrapper>
  );
};
