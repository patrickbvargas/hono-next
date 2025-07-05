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
import type { Contract } from "~/shared/types/contract";
import type { EntityPanelData } from "~/shared/types/entity-data";

interface ContractDetailsProps
  extends Omit<React.ComponentProps<typeof EntityPanel>, "children"> {
  contract: Contract | null;
}

export const ContractDetails = ({
  contract,
  ...props
}: ContractDetailsProps) => {
  if (!contract) return null;

  const contractData: EntityPanelData[] = [
    {
      title: "Identificação",
      data: [
        {
          term: "Processo",
          definition: contract.identification,
        },
        {
          term: "Área",
          definition: formatter.contractLegalArea(contract.legalArea),
        },
        {
          term: "Cliente",
          definition: contract.client,
        },
        {
          term: "Advogado",
          definition: contract.lawyer,
        },
      ],
    },
    {
      title: "Financeiro",
      data: [
        {
          term: "Honorários",
          definition: formatter.percent(contract.feePercent),
        },
      ],
    },
    {
      title: "Detalhes",
      data: [
        {
          term: "Status",
          definition: <ChipStatus status={contract.status} />,
        },
      ],
    },
  ];

  return (
    <EntityPanel {...props}>
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
    </EntityPanel>
  );
};
