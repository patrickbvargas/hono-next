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
import { ROUTES } from "~/shared/constants";
import { DetailSkeleton } from "./skeleton";
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
  const [remuneration] = api.remunerations.getOne.useSuspenseQuery({ id });

  const remunerationData: EntityPanelData[] = React.useMemo(() => {
    const generalSection: EntityPanelData = {
      title: "Informações Gerais",
      data: [
        {
          term: "Processo",
          definition: (
            <AnchorLink
              href={`${ROUTES.contract.url}${searchSerializer({
                query: remuneration.contract.identification,
              })}`}
            >
              {remuneration.contract.identification}
            </AnchorLink>
          ),
        },
        {
          term: "Área",
          definition: formatter.contractLegalArea(
            remuneration.contract.legalArea,
          ),
        },
        {
          term: "Cliente",
          definition: (
            <AnchorLink
              href={`${ROUTES.client.url}${searchSerializer({
                query: remuneration.contract.client.fullName,
              })}`}
            >
              {remuneration.contract.client.fullName}
            </AnchorLink>
          ),
        },
        {
          term: "Designação",
          definition: formatter.employeeAssignment(
            remuneration.contractEmployee.assignment,
          ),
        },
      ],
    };

    const financialSection: EntityPanelData = {
      title: "Financeiro",
      data: [
        {
          term: "Valor",
          definition: formatter.currency(remuneration.amount),
        },
        {
          term: "Percentual",
          definition: formatter.percent(remuneration.percentage),
        },
        {
          term: "Pagamento",
          definition: formatter.date(remuneration.paymentDate),
        },
        {
          term: "Tipo Receita",
          definition: formatter.revenueType(remuneration.fee.revenue.type),
        },
      ],
    };

    const registerSection: EntityPanelData = {
      title: "Registro",
      data: [
        {
          term: "Criado em",
          definition: formatter.timestamp(remuneration.createdAt),
        },
      ],
    };

    return [generalSection, financialSection, registerSection];
  }, [remuneration]);

  return (
    <React.Fragment>
      <EntityPanelHeader>
        <EntityPanelTitle>
          {remuneration.contractEmployee.employee.fullName}
        </EntityPanelTitle>
      </EntityPanelHeader>
      <EntityPanelBody>
        <EntityPanelAccordion data={remunerationData} />
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
