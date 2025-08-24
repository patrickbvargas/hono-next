"use client";

import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  WrapperFooter,
  Search,
  ButtonNew,
  PaginationControl,
} from "~/shared/components";
import { Form } from "./components/form";
import { Table } from "./components/table";
import { ROUTES } from "~/shared/constants";
import { Filter } from "./components/filter";
import { useModalActions } from "./stores/use-modal";
import type { EmployeeSummary } from "~/shared/types/employee";

interface EmployeeListProps {
  employees: EmployeeSummary[];
  count: number;
}

export const EmployeeList = ({ employees, count }: EmployeeListProps) => {
  const { openCreateModal } = useModalActions();

  return (
    <Wrapper title={ROUTES.employee.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Nome ou OAB..." />
        <Filter />
        <ButtonNew onClick={openCreateModal} />
      </WrapperHeader>
      <WrapperBody>
        <Table employees={employees} />
        <Form />
      </WrapperBody>
      <WrapperFooter>
        <PaginationControl totalRecords={count} />
      </WrapperFooter>
    </Wrapper>
  );
};
