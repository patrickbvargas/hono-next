import * as React from "react";
import {
  AnchorLink,
  ChipStatus,
  EntityPanel,
  EntityPanelAccordion,
  EntityPanelActions,
  EntityPanelBody,
  EntityPanelFooter,
  EntityPanelHeader,
  type EntityPanelProps,
} from "~/shared/components";
import { api } from "~/trpc/client";
import { Spinner } from "@heroui/react";
import { ROUTES } from "~/shared/constants/route";
import { formatter } from "~/shared/lib/formatter";
import { searchSerializer } from "~/shared/lib/nuqs";
import type { EntityPanelData } from "~/shared/types/entity-data";

interface EmployeeDetailsProps extends EntityPanelProps {
  id: string;
}

export const EmployeeDetails = ({ id, ...props }: EmployeeDetailsProps) => {
  return (
    <EntityPanel {...props}>
      <React.Suspense fallback={<Spinner />}>
        <EmployeeDetailsContent id={id} />
      </React.Suspense>
    </EntityPanel>
  );
};

interface EmployeeDetailsContentProps {
  id: string;
}

const EmployeeDetailsContent = ({ id }: EmployeeDetailsContentProps) => {
  const [employee] = api.employees.getOne.useSuspenseQuery({ id });

  const employeeData: EntityPanelData[] = React.useMemo(() => {
    const generalSection: EntityPanelData = {
      title: "Informações Gerais",
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
        {
          term: "Contratos",
          definition: (
            <AnchorLink
              href={`${ROUTES.contract.url}${searchSerializer({
                query: employee.fullName,
              })}`}
            >
              {employee.contractCount}
            </AnchorLink>
          ),
        },
      ],
    };

    const financialSection: EntityPanelData = {
      title: "Financeiro",
      data: [
        {
          term: "Remuneração",
          definition: formatter.percent(employee.remunerationPercent),
        },
      ],
    };

    const registerSection: EntityPanelData = {
      title: "Registro",
      data: [
        {
          term: "Status",
          definition: <ChipStatus status={employee.status} />,
        },
        {
          term: "Criado em",
          definition: formatter.timestamp(employee.createdAt),
        },
      ],
    };

    return [generalSection, financialSection, registerSection];
  }, [employee]);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
