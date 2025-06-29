import type { EmployeeRole, EmployeeType } from "~/shared/types/employee";
import type { EntityStatus } from "~/shared/types/drizzle";

const EntityStatusAlias = {
  active: "Ativo",
  inactive: "Inativo",
} satisfies Record<EntityStatus, string>;

const EmployeeRoleAlias = {
  user: "Usuário",
  admin: "Admin",
} satisfies Record<EmployeeRole, string>;

const EmployeeTypeAlias = {
  lawyer: "Advogado",
  admin_assistant: "Aux. Admin.",
} satisfies Record<EmployeeType, string>;

function formatEntityStatus(status: EntityStatus) {
  return EntityStatusAlias[status] ?? status;
}

function formatEmployeeRole(role: EmployeeRole) {
  return EmployeeRoleAlias[role] ?? role;
}

function formatEmployeeType(type: EmployeeType) {
  return EmployeeTypeAlias[type] ?? type;
}

function formatOAB(oab: string) {
  if (!oab) return "-";
  const regex = /^([A-Z]{2})(\d{3})(\d{3})$/;
  const match = oab.match(regex);
  return match ? `${match[1]} ${match[2]}.${match[3]}` : oab;
}

function formatPercent(percent: number, decimals = 2) {
  return percent.toLocaleString("pt-BR", {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export const formatter = {
  entityStatus: formatEntityStatus,
  employeeRole: formatEmployeeRole,
  employeeType: formatEmployeeType,
  percent: formatPercent,
  oab: formatOAB,
};
