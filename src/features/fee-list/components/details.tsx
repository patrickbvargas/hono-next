import * as React from "react";
import {
  AnchorLink,
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

interface FeeDetailsProps extends EntityPanelProps {
  id: string;
}

export const FeeDetails = ({ id, ...props }: FeeDetailsProps) => {
  return (
    <EntityPanel {...props}>
      <React.Suspense fallback={<Spinner />}>
        <FeeDetailsContent id={id} />
      </React.Suspense>
    </EntityPanel>
  );
};

interface FeeDetailsContentProps {
  id: string;
}

const FeeDetailsContent = ({ id }: FeeDetailsContentProps) => {
  const [fee] = api.fees.getOne.useSuspenseQuery({ id });

  const feeData: EntityPanelData[] = React.useMemo(() => {
    const generalSection: EntityPanelData = {
      title: "Informações Gerais",
      data: [
        {
          term: "Contrato",
          definition: (
            <AnchorLink
              href={`${ROUTES.contract.url}${searchSerializer({
                query: fee.contract.identification,
              })}`}
            >
              {fee.contract.identification}
            </AnchorLink>
          ),
        },
        {
          term: "Área",
          definition: formatter.contractLegalArea(fee.contract.legalArea),
        },
        {
          term: "Cliente",
          definition: (
            <AnchorLink
              href={`${ROUTES.client.url}${searchSerializer({
                query: fee.contract.client.fullName,
              })}`}
            >
              {fee.contract.client.fullName}
            </AnchorLink>
          ),
        },
      ],
    };

    const financialSection: EntityPanelData = {
      title: "Financeiro",
      data: [
        {
          term: "Valor",
          definition: formatter.currency(fee.value),
        },
        {
          term: "Pagamento",
          definition: formatter.date(fee.paymentDate),
        },
        {
          term: "Tipo Receita",
          definition: formatter.revenueType(fee.revenue.type),
        },
      ],
    };

    const remunerationsSections: EntityPanelData[] = fee.remunerations.map(
      (r) => ({
        title: `Remuneração - ${r.contractEmployee.employee.fullName}`,
        data: [
          {
            term: "Designação",
            definition: formatter.employeeAssignment(
              r.contractEmployee.assignment,
            ),
          },
          {
            term: "Valor",
            definition: formatter.currency(r.value),
          },
          {
            term: "Percentual",
            definition: formatter.percent(r.remunerationPercent),
          },
        ],
      }),
    );

    const registerSection: EntityPanelData = {
      title: "Registro",
      data: [
        {
          term: "Criado em",
          definition: formatter.timestamp(fee.createdAt),
        },
      ],
    };

    return [
      generalSection,
      financialSection,
      ...remunerationsSections,
      registerSection,
    ];
  }, [fee]);

  return (
    <React.Fragment>
      <EntityPanelHeader>{fee.contract.identification}</EntityPanelHeader>
      <EntityPanelBody>
        <EntityPanelAccordion data={feeData} />
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
