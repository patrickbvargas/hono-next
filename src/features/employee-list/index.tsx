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
import { EmployeeTable } from "./components/table";
import { EmployeeFilter } from "./components/filter";
import { EmployeeDetails } from "./components/details";
import type { Employee } from "~/shared/types/employee";

interface EmployeeListProps {
  employees: Employee[];
  count: number;
}

export const EmployeeList = ({ employees, count }: EmployeeListProps) => {
  const { isOpen, onOpenChange, selectedItem, handleSelectItem } =
    useEntityDetails<Employee>();

  return (
    <Wrapper title={ROUTES.employee.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Nome ou OAB..." />
        <EmployeeFilter />
      </WrapperHeader>
      <WrapperBody>
        <EmployeeTable
          employees={employees}
          totalCount={count}
          onSelectEmployee={handleSelectItem}
        />
        <EmployeeDetails
          employee={selectedItem}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </WrapperBody>
    </Wrapper>
  );
};
