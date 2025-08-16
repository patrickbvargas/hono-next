"use client";

import * as React from "react";
import {
  RHFCheckboxGroup,
  RHFDivider,
  RHFFieldset,
  RHFForm,
  EntityFilter,
  EntityFilterBody,
} from "~/shared/components";
import { useFilter } from "../../hooks/use-filter";
import { formatter } from "~/shared/lib/formatter";
import { REVENUE_TYPES } from "~/shared/constants/revenue";
import type { Filter as FeeFilter } from "../../schemas/filter";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants/contract";

export const Filter = () => {
  const { methods, isOpen, handleOpenChange, handleFormSubmit } = useFilter();

  return (
    <EntityFilter isOpen={isOpen} onOpenChange={handleOpenChange}>
      <EntityFilterBody>
        <RHFForm
          submitCallback={handleFormSubmit}
          className="min-w-40"
          {...methods}
        >
          <RHFFieldset>
            <RHFCheckboxGroup.Root<FeeFilter> name="legalArea" label="Área">
              {CONTRACT_LEGAL_AREAS.map((area) => (
                <RHFCheckboxGroup.Checkbox key={area} value={area}>
                  {formatter.contractLegalArea(area)}
                </RHFCheckboxGroup.Checkbox>
              ))}
            </RHFCheckboxGroup.Root>
          </RHFFieldset>
          <RHFDivider />
          <RHFFieldset>
            <RHFCheckboxGroup.Root<FeeFilter>
              name="revenueType"
              label="Tipo Receita"
            >
              {REVENUE_TYPES.map((type) => (
                <RHFCheckboxGroup.Checkbox key={type} value={type}>
                  {formatter.revenueType(type)}
                </RHFCheckboxGroup.Checkbox>
              ))}
            </RHFCheckboxGroup.Root>
          </RHFFieldset>
        </RHFForm>
      </EntityFilterBody>
    </EntityFilter>
  );
};
