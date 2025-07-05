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
import { CLIENT_TYPES } from "~/shared/constants/client";
import { zFilter, type Filter } from "../schemas/filter";
import { getDefaultFilterValues } from "../utils/default";
import { ENTITY_STATUS } from "~/shared/constants/entity";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

export const ClientFilter = () => {
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
            <RHFCheckboxGroup.Root<Filter> name="type" label="Tipo">
              {CLIENT_TYPES.map((type) => (
                <RHFCheckboxGroup.Checkbox key={type} value={type}>
                  {formatter.clientType(type)}
                </RHFCheckboxGroup.Checkbox>
              ))}
            </RHFCheckboxGroup.Root>
          </RHFFieldset>
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
