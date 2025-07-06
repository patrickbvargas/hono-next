import * as React from "react";
import {
  ChipStatus,
  EntityPanel,
  EntityPanelAccordion,
  EntityPanelActions,
  EntityPanelBody,
  EntityPanelFooter,
  EntityPanelHeader,
} from "~/shared/components";
import { formatter } from "~/shared/lib/formatter";
import type { EmployeeSummary } from "~/shared/types/employee";
import type { EntityPanelData } from "~/shared/types/entity-data";

interface EmployeeDetailsProps
  extends Omit<React.ComponentProps<typeof EntityPanel>, "children"> {
  employee: EmployeeSummary | null;
}

export const EmployeeDetails = ({
  employee,
  ...props
}: EmployeeDetailsProps) => {
  if (!employee) return null;

  const employeeData: EntityPanelData[] = [
    {
      title: "Identificação",
      data: [
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
    },
    {
      title: "Financeiro",
      data: [
        {
          term: "Remuneração",
          definition: formatter.percent(employee.remunerationPercent),
        },
      ],
    },
    {
      title: "Detalhes",
      data: [
        {
          term: "Contratos",
          definition: employee.contractCount,
        },
        {
          term: "Status",
          definition: <ChipStatus status={employee.status} />,
        },
      ],
    },
  ];

  return (
    <EntityPanel {...props}>
      <EntityPanelHeader>{employee.fullName}</EntityPanelHeader>
      <EntityPanelBody>
        <EntityPanelAccordion data={employeeData} />
      </EntityPanelBody>
      <EntityPanelFooter>
        <EntityPanelActions
          onEdit={() => console.log("edit")}
          onDelete={() => console.log("delete")}
        />
      </EntityPanelFooter>
    </EntityPanel>
  );
};
