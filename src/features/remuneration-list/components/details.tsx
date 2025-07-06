import * as React from "react";
import {
  EntityPanel,
  EntityPanelAccordion,
  EntityPanelActions,
  EntityPanelBody,
  EntityPanelFooter,
  EntityPanelHeader,
} from "~/shared/components";
import { formatter } from "~/shared/lib/formatter";
import type { EntityPanelData } from "~/shared/types/entity-data";
import type { RemunerationSummary } from "~/shared/types/remuneration";

interface RemunerationDetailsProps
  extends Omit<React.ComponentProps<typeof EntityPanel>, "children"> {
  remuneration: RemunerationSummary | null;
}

export const RemunerationDetails = ({
  remuneration,
  ...props
}: RemunerationDetailsProps) => {
  if (!remuneration) return null;

  const remunerationData: EntityPanelData[] = [
    {
      title: "Identificação",
      data: [
        {
          term: "Processo",
          definition: remuneration.contract,
        },
        {
          term: "Funcionário",
          definition: remuneration.employee,
        },
        {
          term: "Área",
          definition: formatter.contractLegalArea(remuneration.legalArea),
        },
      ],
    },
    {
      title: "Financeiro",
      data: [
        {
          term: "Valor",
          definition: formatter.currency(remuneration.value),
        },
        {
          term: "Pagamento",
          definition: formatter.date(remuneration.paymentDate),
        },
        {
          term: "Tipo Receita",
          definition: formatter.revenueType(remuneration.revenueType),
        },
        {
          term: "Percentual",
          definition: formatter.percent(remuneration.remunerationPercent),
        },
      ],
    },
  ];

  return (
    <EntityPanel {...props}>
      <EntityPanelHeader>{remuneration.employee}</EntityPanelHeader>
      <EntityPanelBody>
        <EntityPanelAccordion data={remunerationData} />
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
