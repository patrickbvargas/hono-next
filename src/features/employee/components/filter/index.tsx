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
import { ENTITY_STATUS } from "~/shared/constants";
import type { EmployeeFilter } from "../../schemas/filter";
import { EMPLOYEE_ROLES, EMPLOYEE_TYPES } from "~/shared/constants";

export const Filter = () => {
  const { methods, isOpen, handleOpenChange, handleFormSubmit } = useFilter();

  return (
    <EntityFilter open={isOpen} onOpenChange={handleOpenChange}>
      <EntityFilterBody>
        <RHFForm submitCallback={handleFormSubmit} {...methods}>
          <RHFFieldset>
            <RHFCheckbox<EmployeeFilter>
              name="role"
              label="Perfil"
              items={EMPLOYEE_ROLES.map((role) => ({
                value: role,
                label: formatter.employeeRole(role),
              }))}
            />
          </RHFFieldset>
          <RHFFieldset>
            <RHFCheckbox<EmployeeFilter>
              name="type"
              label="Função"
              items={EMPLOYEE_TYPES.map((type) => ({
                value: type,
                label: formatter.employeeType(type),
              }))}
            />
          </RHFFieldset>
          <RHFFieldset>
            <RHFCheckbox<EmployeeFilter>
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
