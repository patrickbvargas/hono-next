import type { Filter } from "../schemas/filter";

export const getDefaultFilterValues = (): Filter => {
  return {
    type: [],
    status: [],
  };
};
