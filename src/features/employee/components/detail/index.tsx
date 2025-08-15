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
import type { Employee } from "~/shared/types/employee";
import type { EntityPanelData } from "~/shared/types/entity-data";

interface DetailProps extends EntityPanelProps {
  id: string;
  onEditEmployee: (employee: Employee) => void;
}

export const Detail = ({ id, onEditEmployee, ...props }: DetailProps) => {
  return (
    <EntityPanel {...props}>
      <React.Suspense fallback={<Spinner />}>
        <DetailContent id={id} onEditEmployee={onEditEmployee} />
      </React.Suspense>
    </EntityPanel>
  );
};

interface DetailContentProps {
  id: string;
  onEditEmployee: (employee: Employee) => void;
}

const DetailContent = ({ id, onEditEmployee }: DetailContentProps) => {
  const [employee] = api.employees.getOne.useSuspenseQuery({ id });

  const employeeData: EntityPanelData[] = React.useMemo(() => {
    const generalSection: EntityPanelData = {
      title: "Informações Gerais",
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
          onEdit={() => onEditEmployee(employee)}
          onDelete={() => console.log("delete")}
        />
      </EntityPanelFooter>
    </React.Fragment>
  );
};
