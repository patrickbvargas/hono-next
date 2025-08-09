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
import { EMPLOYEE_ROLES, EMPLOYEE_TYPES } from "~/shared/constants/employee";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

export const EmployeeFilter = () => {
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
            <RHFCheckboxGroup.Root<Filter> name="role" label="Perfil">
              {EMPLOYEE_ROLES.map((role) => (
                <RHFCheckboxGroup.Checkbox key={role} value={role}>
                  {formatter.employeeRole(role)}
                </RHFCheckboxGroup.Checkbox>
              ))}
            </RHFCheckboxGroup.Root>
          </RHFFieldset>
          <RHFDivider />
          <RHFFieldset>
            <RHFCheckboxGroup.Root<Filter> name="type" label="Função">
              {EMPLOYEE_TYPES.map((type) => (
                <RHFCheckboxGroup.Checkbox key={type} value={type}>
                  {formatter.employeeType(type)}
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