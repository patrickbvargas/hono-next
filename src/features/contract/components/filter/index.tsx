"use client";

import * as React from "react";
import {
  RHFCheckboxGroup,
  RHFDivider,
  RHFFieldset,
  RHFForm,
  ButtonFilter,
} from "~/shared/components";
import { useIsMobile } from "~/shared/hooks";
import { useFilter } from "../../hooks/use-filter";
import { formatter } from "~/shared/lib/formatter";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants/contract";
import type { Filter as ContractFilter } from "../../schemas/filter";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

export const Filter = () => {
  const isMobile = useIsMobile();
  const { methods, isOpen, handleOpenChange, handleFormSubmit } = useFilter();

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      placement={isMobile ? "bottom-end" : "bottom-start"}
    >
      <PopoverTrigger>
        <ButtonFilter className="place-self-start" />
      </PopoverTrigger>
      <PopoverContent>
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
          <RHFDivider />
          <RHFFieldset className="flex justify-end">
            <Button size="sm" type="submit">
              Aplicar
            </Button>
          </RHFFieldset>
        </RHFForm>
      </PopoverContent>
    </Popover>
  );
};
