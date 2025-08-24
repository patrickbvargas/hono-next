"use client";

import { api } from "~/trpc/client";
import { toast } from "~/shared/lib/toast";
import { useRouter } from "next/navigation";
import { useModalActions } from "../stores/use-modal";

interface UseDeleteProps {
  id: string;
}

export function useDelete({ id }: UseDeleteProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const { closeModal } = useModalActions();

  const deleteMutation = api.employees.delete.useMutation({
    onSuccess: (resp) => {
      toast.success(resp.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({ id });

      closeModal();
      utils.employees.getMany.invalidate();
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleDelete,
    isDeleting: deleteMutation.isPending,
  };
}
