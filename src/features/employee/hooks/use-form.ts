"use client";

import * as React from "react";
import {
  getDefaultFormEditValues,
  getDefaultFormCreateValues,
} from "../utils/default";
import { api } from "~/trpc/client";
import { useRouter } from "next/navigation";
import { heroToast } from "~/shared/lib/toast";
import { useModalActions } from "../stores/use-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useRHFForm } from "react-hook-form";
import type { FormModalMode } from "~/shared/types/form-modal";
import { zEmployeeForm, type EmployeeForm } from "~/shared/schemas/employee";

interface UseFormProps {
  mode: FormModalMode;
  id?: string;
}

export function useForm({ mode, id }: UseFormProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const { closeModal } = useModalActions();
  const isEdition = mode === "edit";

  const methods = useRHFForm<EmployeeForm>({
    resolver: zodResolver(zEmployeeForm),
    defaultValues: getDefaultFormCreateValues(),
  });

  const [employee] =
    isEdition && id
      ? api.employees.getOne.useSuspenseQuery({ id })
      : [undefined];

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

  const handleSubmit = async (data: EmployeeForm) => {
    try {
      if (mode === "edit") {
        await updateMutation.mutateAsync(data);
      } else {
        await createMutation.mutateAsync(data);
      }

      closeModal();
      methods.reset();
      utils.employees.getMany.invalidate();
      utils.employees.getOne.invalidate({ id });
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  // Update form values when employee is loaded
  React.useEffect(() => {
    if (isEdition && employee) {
      methods.reset(getDefaultFormEditValues(employee));
    }
  }, [employee, isEdition, methods]);

  return {
    methods,
    handleSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
}
