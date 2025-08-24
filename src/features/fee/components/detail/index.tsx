"use client";

import * as React from "react";
import {
  AnchorLink,
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
  const [fee] = api.fees.getOne.useSuspenseQuery({ id });

  const feeData: EntityPanelData[] = React.useMemo(() => {
    const generalSection: EntityPanelData = {
      title: "Informações Gerais",
      data: [
        {
          term: "Processo",
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
          term: "Área",
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
          definition: formatter.currency(fee.amount),
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
            definition: formatter.currency(r.amount),
          },
          {
            term: "Percentual",
            definition: formatter.percent(r.percentage),
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
      <EntityPanelHeader>
        <EntityPanelTitle>{fee.contract.identification}</EntityPanelTitle>
      </EntityPanelHeader>
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
