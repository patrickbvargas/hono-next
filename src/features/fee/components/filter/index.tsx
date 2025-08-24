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
import { REVENUE_TYPES } from "~/shared/constants";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants";
import type { Filter as FeeFilter } from "../../schemas/filter";

export const Filter = () => {
  const { methods, isOpen, handleOpenChange, handleFormSubmit } = useFilter();

  return (
    <EntityFilter open={isOpen} onOpenChange={handleOpenChange}>
      <EntityFilterBody>
        <RHFForm submitCallback={handleFormSubmit} {...methods}>
          <RHFFieldset>
            <RHFCheckbox<FeeFilter>
              name="legalArea"
              label="Área"
              items={CONTRACT_LEGAL_AREAS.map((area) => ({
                value: area,
                label: formatter.contractLegalArea(area),
              }))}
            />
          </RHFFieldset>
          <RHFFieldset>
            <RHFCheckbox<FeeFilter>
              name="revenueType"
              label="Tipo Receita"
              items={REVENUE_TYPES.map((type) => ({
                value: type,
                label: formatter.revenueType(type),
              }))}
            />
          </RHFFieldset>
        </RHFForm>
      </EntityFilterBody>
    </EntityFilter>
  );
};
