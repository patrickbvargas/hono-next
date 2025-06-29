import * as React from "react";
import {
  EntityDetails,
  EntityDetailsGroup,
  Section,
  SectionTitle,
  SectionContent,
  DefinitionList,
} from "~/shared/components";
import type { ClientData } from "../types/client-data";

interface ClientDataDisplayProps {
  data: ClientData;
}

export const ClientDataDisplay = ({ data }: ClientDataDisplayProps) => {
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
          <SectionTitle title="Contato" />
          <SectionContent>
            <DefinitionList data={data.contact} />
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
