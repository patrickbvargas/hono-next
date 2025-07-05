import type { ClientType } from "~/shared/types/client";
import type { EntityStatus } from "~/shared/types/drizzle";
import type { ContractLegalArea } from "~/shared/types/contract";
import type { EmployeeRole, EmployeeType } from "~/shared/types/employee";

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

const ClientTypeAlias = {
  pf: "PF",
  pj: "PJ",
} satisfies Record<ClientType, string>;

const ContractLegalAreaAlias = {
  civil: "Civil",
  family: "Familiar",
  labor: "Trabalhista",
  other: "Outro",
  social_security: "Previdenciário",
} satisfies Record<ContractLegalArea, string>;

function formatEntityStatus(status: EntityStatus) {
  return EntityStatusAlias[status] ?? status;
}

function formatEmployeeRole(role: EmployeeRole) {
  return EmployeeRoleAlias[role] ?? role;
}

function formatEmployeeType(type: EmployeeType) {
  return EmployeeTypeAlias[type] ?? type;
}

function formatClientType(type: ClientType) {
  return ClientTypeAlias[type] ?? type;
}

function formatContractLegalArea(legalArea: ContractLegalArea) {
  return ContractLegalAreaAlias[legalArea] ?? legalArea;
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

function formatCnpjf(cnpjf: string) {
  if (cnpjf.length === 11)
    return cnpjf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  if (cnpjf.length === 14)
    return cnpjf.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    );
  return cnpjf;
}

export const formatter = {
  entityStatus: formatEntityStatus,
  employeeRole: formatEmployeeRole,
  employeeType: formatEmployeeType,
  clientType: formatClientType,
  contractLegalArea: formatContractLegalArea,
  percent: formatPercent,
  oab: formatOAB,
  cnpjf: formatCnpjf,
};
