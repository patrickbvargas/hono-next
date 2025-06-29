import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
  WrapperTitle,
} from "~/shared/components";
import { EmployeeTable } from "./components/table";
import { EmployeeFilter } from "./components/filter";
import type { Employee } from "~/shared/types/employee";

interface EmployeeListProps {
  employees: Employee[];
  count: number;
}

export const EmployeeList = async ({ employees, count }: EmployeeListProps) => {
  return (
    <Wrapper>
      <WrapperHeader>
        <WrapperTitle title="Funcionários" />
      </WrapperHeader>
      <WrapperBody>
        <div className="flex items-center gap-2">
          <Search placeholder="Filtrar por Nome ou OAB..." />
          <EmployeeFilter />
        </div>
        <EmployeeTable data={employees} totalCount={count} />
      </WrapperBody>
    </Wrapper>
  );
};
