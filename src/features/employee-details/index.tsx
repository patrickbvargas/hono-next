import * as React from "react";
import {
  Wrapper,
  WrapperHeader,
  WrapperBody,
  WrapperTitle,
} from "~/shared/components";
import { formatter } from "~/shared/lib/formatter";
import type { Employee } from "~/shared/types/employee";
import type { EmployeeData } from "./types/employee-data";
import { EmployeeDataDisplay } from "./components/display";

interface EmployeeDetailsProps {
  employee: Employee;
}

export const EmployeeDetails = async ({ employee }: EmployeeDetailsProps) => {
  const employeeData: EmployeeData = {
    identification: [
      {
        term: "OAB",
        definition: formatter.oab(employee.oabNumber ?? ""),
      },
      {
        term: "Cargo",
        definition: formatter.employeeType(employee.type),
      },
      {
        term: "Perfil",
        definition: formatter.employeeRole(employee.role),
      },
    ],
    finance: [
      {
        term: "Remuneração",
        definition: formatter.percent(employee.remunerationPercent),
      },
    ],
    details: [
      {
        term: "Contratos",
        definition: employee.contractCount,
      },
      {
        term: "Status",
        definition: formatter.entityStatus(employee.status),
      },
    ],
  };

  return (
    <Wrapper>
      <WrapperHeader>
        <WrapperTitle title={employee.fullName} />
      </WrapperHeader>
      <WrapperBody>
        <EmployeeDataDisplay data={employeeData} />
      </WrapperBody>
    </Wrapper>
  );
};
