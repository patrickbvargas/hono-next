import {
  clients,
  contracts,
  revenues,
  fees,
  employees,
  remunerations,
  contractEmployees,
} from "~/server/db/schemas";

const initialEmployees = [] satisfies (typeof employees.$inferInsert)[];

const initialClients = [] satisfies (typeof clients.$inferInsert)[];

const initialContracts = [] satisfies (typeof contracts.$inferInsert)[];

const initialContractEmployees =
  [] satisfies (typeof contractEmployees.$inferInsert)[];

const initialRevenues = [] satisfies (typeof revenues.$inferInsert)[];

const initialFees = [] satisfies (typeof fees.$inferInsert)[];

const initialRemunerations = [] satisfies (typeof remunerations.$inferInsert)[];

export const seedData = {
  employees: initialEmployees,
  clients: initialClients,
  revenues: initialRevenues,
  contracts: initialContracts,
  contractEmployees: initialContractEmployees,
  fees: initialFees,
  remunerations: initialRemunerations,
};
