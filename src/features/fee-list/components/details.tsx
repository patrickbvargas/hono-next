import * as React from "react";
import {
  EntityPanel,
  EntityPanelAccordion,
  EntityPanelActions,
  EntityPanelBody,
  EntityPanelFooter,
  EntityPanelHeader,
} from "~/shared/components";
import type { Fee } from "~/shared/types/fee";
import { formatter } from "~/shared/lib/formatter";
import type { EntityPanelData } from "~/shared/types/entity-data";

interface FeeDetailsProps
  extends Omit<React.ComponentProps<typeof EntityPanel>, "children"> {
  fee: Fee | null;
}

export const FeeDetails = ({ fee, ...props }: FeeDetailsProps) => {
  if (!fee) return null;

  const feeData: EntityPanelData[] = [
    {
      title: "Identificação",
      data: [
        {
          term: "Processo",
          definition: fee.contract,
        },
        {
          term: "Área",
          definition: formatter.contractLegalArea(fee.legalArea),
        },
        {
          term: "Cliente",
          definition: fee.client,
        },
      ],
    },
    {
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
          definition: formatter.revenueType(fee.revenueType),
        },
      ],
    },
  ];

  return (
    <EntityPanel {...props}>
      <EntityPanelHeader>{fee.contract}</EntityPanelHeader>
      <EntityPanelBody>
        <EntityPanelAccordion data={feeData} />
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
