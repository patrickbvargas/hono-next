import * as React from "react";
import {
  EntityDetails,
  EntityDetailsGroup,
  Section,
  SectionTitle,
  SectionContent,
  DefinitionList,
} from "~/shared/components";
import type { EmployeeData } from "../types/employee-data";

interface EmployeeDataDisplayProps {
  data: EmployeeData;
}

export const EmployeeDataDisplay = ({ data }: EmployeeDataDisplayProps) => {
  return (
    <EntityDetails>
      <EntityDetailsGroup>
        <Section>
          <SectionTitle title="Identificação" />
          <SectionContent>
            <DefinitionList data={data.identification} />
          </SectionContent>
        </Section>
      </EntityDetailsGroup>
      <EntityDetailsGroup>
        <Section>
          <SectionTitle title="Financeiro" />
          <SectionContent>
            <DefinitionList data={data.finance} />
          </SectionContent>
        </Section>
      </EntityDetailsGroup>
      <EntityDetailsGroup>
        <Section>
          <SectionTitle title="Detalhes" />
          <SectionContent>
            <DefinitionList data={data.details} />
          </SectionContent>
        </Section>
      </EntityDetailsGroup>
    </EntityDetails>
  );
};
