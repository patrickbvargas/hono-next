"use client";

import * as React from "react";
import {
  RHFCheckboxGroup,
  RHFDivider,
  RHFFieldset,
  RHFForm,
  ButtonFilter,
} from "~/shared/components";
import { filterParser } from "../parsers";
import { useForm } from "react-hook-form";
import { formatter } from "~/shared/lib/formatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFilter, useIsMobile } from "~/shared/hooks";
import { zFilter, type Filter } from "../schemas/filter";
import { getDefaultFilterValues } from "../utils/default";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import { CONTRACT_LEGAL_AREAS } from "~/shared/constants/contract";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

export const ContractFilter = () => {
  const isMobile = useIsMobile();
  const { filters, handleFilters } = useFilter(filterParser);
  const methods = useForm<Filter>({
    resolver: zodResolver(zFilter),
    values: filters,
    defaultValues: getDefaultFilterValues(),
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const handleFormSubmit = (data: Filter) => {
    handleFilters(data);
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onClose={() => methods.reset(filters)}
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
            <RHFCheckboxGroup.Root<Filter> name="legalArea" label="Área">
              {CONTRACT_LEGAL_AREAS.map((area) => (
                <RHFCheckboxGroup.Checkbox key={area} value={area}>
                  {formatter.contractLegalArea(area)}
                </RHFCheckboxGroup.Checkbox>
              ))}
            </RHFCheckboxGroup.Root>
          </RHFFieldset>
          <RHFDivider />
          <RHFFieldset>
            <RHFCheckboxGroup.Root<Filter> name="status" label="Status">
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
