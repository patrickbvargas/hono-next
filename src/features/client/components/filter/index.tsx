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
import { CLIENT_TYPES, ENTITY_STATUS } from "~/shared/constants";
import type { Filter as ClientFilter } from "../../schemas/filter";

export const Filter = () => {
  const { methods, isOpen, handleOpenChange, handleFormSubmit } = useFilter();

  return (
    <EntityFilter open={isOpen} onOpenChange={handleOpenChange}>
      <EntityFilterBody>
        <RHFForm submitCallback={handleFormSubmit} {...methods}>
          <RHFFieldset>
            <RHFCheckbox<ClientFilter>
              name="type"
              label="Tipo"
              items={CLIENT_TYPES.map((type) => ({
                value: type,
                label: formatter.clientType(type),
              }))}
            />
          </RHFFieldset>
          <RHFFieldset>
            <RHFCheckbox<ClientFilter>
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
