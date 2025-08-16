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
import { ENTITY_STATUS } from "~/shared/constants/entity";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants/contract";
import type { Filter as ContractFilter } from "../../schemas/filter";

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
            <RHFCheckboxGroup.Root<ContractFilter>
              name="legalArea"
              label="Área"
            >
              {CONTRACT_LEGAL_AREAS.map((area) => (
                <RHFCheckboxGroup.Checkbox key={area} value={area}>
                  {formatter.contractLegalArea(area)}
                </RHFCheckboxGroup.Checkbox>
              ))}
            </RHFCheckboxGroup.Root>
          </RHFFieldset>
          <RHFDivider />
          <RHFFieldset>
            <RHFCheckboxGroup.Root<ContractFilter> name="status" label="Status">
              {ENTITY_STATUS.map((status) => (
                <RHFCheckboxGroup.Checkbox key={status} value={status}>
                  {formatter.entityStatus(status)}
                </RHFCheckboxGroup.Checkbox>
              ))}
            </RHFCheckboxGroup.Root>
          </RHFFieldset>
        </RHFForm>
      </EntityFilterBody>
    </EntityFilter>
  );
};
