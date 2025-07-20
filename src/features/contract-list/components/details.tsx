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

interface ContractDetailsProps extends EntityPanelProps {
  id: string;
}

export const ContractDetails = ({ id, ...props }: ContractDetailsProps) => {
  return (
    <EntityPanel {...props}>
      <React.Suspense fallback={<Spinner />}>
        <ContractDetailsContent id={id} />
      </React.Suspense>
    </EntityPanel>
  );
};

interface ContractDetailsContentProps {
  id: string;
}

const ContractDetailsContent = ({ id }: ContractDetailsContentProps) => {
  const [contract] = api.contracts.getOne.useSuspenseQuery({ id });

  const contractData: EntityPanelData[] = React.useMemo(() => {
    const generalSection: EntityPanelData = {
      title: "Informações Gerais",
      data: [
        {
          term: "Cliente",
          definition: (
            <AnchorLink
              href={`${ROUTES.client.url}${searchSerializer({
                query: contract.client.fullName,
              })}`}
            >
              {contract.client.fullName}
            </AnchorLink>
          ),
        },
        {
          term: "Área",
          definition: formatter.contractLegalArea(contract.legalArea),
        },
        {
          term: "Observações",
          definition: contract.observation ?? "-",
        },
      ],
    };

    const financialSection: EntityPanelData = {
      title: "Financeiro",
      data: [
        {
          term: "Honorários",
          definition: formatter.percent(contract.feePercent),
        },
      ],
    };

    const employeesSection: EntityPanelData = {
      title: "Designações",
      data: contract.employees.map((e) => ({
        term: formatter.employeeAssignment(e.assignment),
        definition: (
          <AnchorLink
            href={`${ROUTES.employee.url}${searchSerializer({
              query: e.employee.fullName,
            })}`}
          >
            {e.employee.fullName}
          </AnchorLink>
        ),
      })),
    };

    const revenuesSections: EntityPanelData[] = contract.revenues.map((r) => ({
      title: `Receita - ${formatter.revenueType(r.type)}`,
      data: [
        {
          term: "Total",
          definition: formatter.currency(r.amount),
        },
        {
          term: "Entrada",
          definition: formatter.currency(r.entryValue),
        },
        {
          term: "Pago",
          definition: `${r.installmentsPaid}/${r.installmentsTotal}`,
        },
        {
          term: "Início Pagto",
          definition: formatter.date(r.paymentStartDate),
        },
      ],
    }));

    const registerSection: EntityPanelData = {
      title: "Registro",
      data: [
        {
          term: "Status",
          definition: <ChipStatus status={contract.status} />,
        },
        {
          term: "Criado em",
          definition: formatter.timestamp(contract.createdAt),
        },
      ],
    };

    return [
      generalSection,
      financialSection,
      employeesSection,
      ...revenuesSections,
      registerSection,
    ];
  }, [contract]);

  return (
    <React.Fragment>
      <EntityPanelHeader>{contract.identification}</EntityPanelHeader>
      <EntityPanelBody>
        <EntityPanelAccordion data={contractData} />
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
