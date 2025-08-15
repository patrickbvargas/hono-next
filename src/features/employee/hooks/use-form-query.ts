"use client";

import { api } from "~/trpc/client";
import type { Employee } from "~/shared/types/employee";
import type { FormModalMode } from "~/shared/hooks/use-form-modal";

interface UseFormQueryProps {
  mode: FormModalMode;
  employee?: Partial<Employee>;
}

export function useFormQuery({ mode, employee }: UseFormQueryProps) {
  const isEdition = mode === "edit";

  const [fullEmployee] =
    isEdition && employee?.id
      ? api.employees.getOne.useSuspenseQuery({ id: employee.id })
      : [undefined];

  return {
    fullEmployee,
    isEdition,
  };
}
