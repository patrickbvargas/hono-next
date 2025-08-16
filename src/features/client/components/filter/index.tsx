"use client";

import * as React from "react";
import {
  RHFCheckboxGroup,
  RHFFieldset,
  RHFForm,
  EntityFilter,
  EntityFilterBody,
} from "~/shared/components";
import { useFilter } from "../../hooks/use-filter";
import { formatter } from "~/shared/lib/formatter";
import { CLIENT_TYPES } from "~/shared/constants/client";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import type { Filter as ClientFilter } from "../../schemas/filter";

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
            <RHFCheckboxGroup.Root<ClientFilter> name="type" label="Tipo">
              {CLIENT_TYPES.map((type) => (
                <RHFCheckboxGroup.Checkbox key={type} value={type}>
                  {formatter.clientType(type)}
                </RHFCheckboxGroup.Checkbox>
              ))}
            </RHFCheckboxGroup.Root>
          </RHFFieldset>
          <RHFFieldset>
            <RHFCheckboxGroup.Root<ClientFilter> name="status" label="Status">
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
