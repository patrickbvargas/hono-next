"use client";

import * as React from "react";
import {
  getDefaultFormEditValues,
  getDefaultFormCreateValues,
} from "../utils/default";
import { api } from "~/trpc/client";
import { useRouter } from "next/navigation";
import { heroToast } from "~/shared/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useRHFForm } from "react-hook-form";
import type { Employee } from "~/shared/types/employee";
import type { FormModalMode } from "~/shared/types/form-modal";
import { zEmployeeForm, type EmployeeForm } from "~/shared/schemas/employee";

interface UseFormProps {
  mode: FormModalMode;
  employee?: Partial<Employee>;
  onOpenChange: (open: boolean) => void;
}

export function useForm({ mode, employee, onOpenChange }: UseFormProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const isEdition = mode === "edit";

  const methods = useRHFForm<EmployeeForm>({
    resolver: zodResolver(zEmployeeForm),
    defaultValues: getDefaultFormCreateValues(),
  });

  // Query logic
  const [fullEmployee] =
    isEdition && employee?.id
      ? api.employees.getOne.useSuspenseQuery({ id: employee.id })
      : [undefined];

  // Mutation logic
  const createMutation = api.employees.create.useMutation({
    onSuccess: (resp) => {
      heroToast.success(resp.message);
    },
    onError: (error) => {
      heroToast.error(error.message);
    },
  });

  const updateMutation = api.employees.update.useMutation({
    onSuccess: (resp) => {
      heroToast.success(resp.message);
    },
    onError: (error) => {
      heroToast.error(error.message);
    },
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleFormSubmit = async (data: EmployeeForm) => {
    try {
      if (mode === "edit") {
        await updateMutation.mutateAsync(data);
      } else {
        await createMutation.mutateAsync(data);
      }

      methods.reset();
      onOpenChange(false);
      utils.employees.getMany.invalidate();
      utils.employees.getOne.invalidate();
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  // Update form values when fullEmployee is loaded
  React.useEffect(() => {
    if (isEdition && fullEmployee) {
      methods.reset(getDefaultFormEditValues(fullEmployee));
    }
  }, [fullEmployee, isEdition, methods]);

  return {
    methods,
    handleFormSubmit,
    isSubmitting,
  };
}
