"use client";

import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
} from "~/shared/components";
import { Plus } from "lucide-react";
import { Button } from "@heroui/react";
import { Form } from "./components/form";
import { Table } from "./components/table";
import { Filter } from "./components/filter";
import { ROUTES } from "~/shared/constants/route";
import { useEmployeeModalActions } from "./store/use-modal";
import type { EmployeeSummary } from "~/shared/types/employee";

interface EmployeeListProps {
  employees: EmployeeSummary[];
  count: number;
}

export const EmployeeList = ({ employees, count }: EmployeeListProps) => {
  const { openCreateModal } = useEmployeeModalActions();

  return (
    <Wrapper title={ROUTES.employee.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Nome ou OAB..." />
        <Filter />
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onPress={openCreateModal}
        >
          Novo
        </Button>
      </WrapperHeader>
      <WrapperBody>
        <Table employees={employees} totalCount={count} />
      </WrapperBody>
      <Form />
    </Wrapper>
  );
};
