import * as React from "react";
import {
  Wrapper,
  WrapperBody,
  WrapperHeader,
  Search,
} from "~/shared/components";
import { ROUTES } from "~/shared/constants/route";
import { EmployeeTable } from "./components/table";
import { EmployeeFilter } from "./components/filter";
import type { EmployeeSummary } from "~/shared/types/employee";

interface EmployeeListProps {
  employees: EmployeeSummary[];
  count: number;
}

export const EmployeeList = ({ employees, count }: EmployeeListProps) => {
  return (
    <Wrapper title={ROUTES.employee.label}>
      <WrapperHeader>
        <Search placeholder="Filtrar por Nome ou OAB..." />
        <EmployeeFilter />
      </WrapperHeader>
      <WrapperBody>
        <EmployeeTable employees={employees} totalCount={count} />
      </WrapperBody>
    </Wrapper>
  );
};
