"use client";

import { api } from "~/trpc/client";
import { useRouter } from "next/navigation";
import { heroToast } from "~/shared/lib/toast";
import type { UseFormReturn } from "react-hook-form";
import type { EmployeeForm } from "~/shared/schemas/employee";
import type { FormModalMode } from "~/shared/hooks/use-form-modal";

interface UseFormMutationProps {
  mode: FormModalMode;
  onOpenChange: (open: boolean) => void;
  methods: UseFormReturn<EmployeeForm>;
}

export function useFormMutation({
  mode,
  onOpenChange,
  methods,
}: UseFormMutationProps) {
  const router = useRouter();
  const utils = api.useUtils();

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
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleFormSubmit,
    isSubmitting,
  };
}
