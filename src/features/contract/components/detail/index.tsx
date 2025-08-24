"use client";

import * as React from "react";
import {
  AnchorLink,
  EntityStatus,
  EntityPanel,
  EntityPanelAccordion,
  EntityPanelActions,
  EntityPanelBody,
  EntityPanelFooter,
  EntityPanelHeader,
  EntityPanelTitle,
  SuspenseBoundary,
} from "~/shared/components";
import { api } from "~/trpc/client";
import { DetailSkeleton } from "./skeleton";
import { ROUTES } from "~/shared/constants";
import { formatter } from "~/shared/lib/formatter";
import { searchSerializer } from "~/shared/lib/nuqs";
import type { EntityPanelData } from "~/shared/types/entity-data";
import { useModal, useModalCallbacks } from "../../stores/use-modal";

export const Detail = () => {
  const { isOpen, mode, id } = useModal();
  const { onOpenChange } = useModalCallbacks();

  const shouldShow = isOpen && mode === "view" && id;

  if (!shouldShow) return null;

  return (
    <EntityPanel open={true} onOpenChange={onOpenChange}>
      <SuspenseBoundary fallback={<DetailSkeleton />}>
        <DetailContent id={id} />
      </SuspenseBoundary>
    </EntityPanel>
  );
};

interface DetailContentProps {
  id: string;
}

const DetailContent = ({ id }: DetailContentProps) => {
  const [contract] = api.contracts.getOne.useSuspenseQuery({ id });

  const contractData: EntityPanelData[] = React.useMemo(() => {
    const generalSection: EntityPanelData = {
      title: "Informações Gerais",
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
          term: "Área",
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
      title: "Designações",
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
          definition: formatter.currency(r.totalValue),
        },
        {
          term: "Entrada",
          definition: formatter.currency(r.downPayment),
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
          definition: <EntityStatus status={contract.status} />,
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
      <EntityPanelHeader>
        <EntityPanelTitle>{contract.identification}</EntityPanelTitle>
      </EntityPanelHeader>
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
