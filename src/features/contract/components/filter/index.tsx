"use client";

import * as React from "react";
import {
  RHFCheckbox,
  RHFFieldset,
  RHFForm,
  EntityFilter,
  EntityFilterBody,
} from "~/shared/components";
import { useFilter } from "../../hooks/use-filter";
import { formatter } from "~/shared/lib/formatter";
import type { Filter as ContractFilter } from "../../schemas/filter";
import { CONTRACT_LEGAL_AREAS, ENTITY_STATUS } from "~/shared/constants";

export const Filter = () => {
  const { methods, isOpen, handleOpenChange, handleFormSubmit } = useFilter();

  return (
    <EntityFilter open={isOpen} onOpenChange={handleOpenChange}>
      <EntityFilterBody>
        <RHFForm submitCallback={handleFormSubmit} {...methods}>
          <RHFFieldset>
            <RHFCheckbox<ContractFilter>
              name="legalArea"
              label="Área"
              items={CONTRACT_LEGAL_AREAS.map((area) => ({
                value: area,
                label: formatter.contractLegalArea(area),
              }))}
            />
          </RHFFieldset>
          <RHFFieldset>
            <RHFCheckbox<ContractFilter>
              name="status"
              label="Status"
              items={ENTITY_STATUS.map((status) => ({
                value: status,
                label: formatter.entityStatus(status),
              }))}
            />
          </RHFFieldset>
        </RHFForm>
      </EntityFilterBody>
    </EntityFilter>
  );
};
