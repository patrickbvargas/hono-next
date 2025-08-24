"use client";

import * as React from "react";
import {
  getDefaultFormEditValues,
  getDefaultFormCreateValues,
} from "../utils/default";
import { api } from "~/trpc/client";
import { toast } from "~/shared/lib/toast";
import { useRouter } from "next/navigation";
import { useModalActions } from "../stores/use-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useRHFForm } from "react-hook-form";
import type { FormModalMode } from "~/shared/types/form-modal";
import { zClientForm, type ClientForm } from "~/shared/schemas/client";

interface UseFormProps {
  mode: FormModalMode;
  id?: string;
}

export function useForm({ mode, id }: UseFormProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const { closeModal } = useModalActions();
  const isEdition = mode === "edit";

  const methods = useRHFForm<ClientForm>({
    resolver: zodResolver(zClientForm),
    defaultValues: getDefaultFormCreateValues(),
  });

  const [client] =
    isEdition && id ? api.clients.getOne.useSuspenseQuery({ id }) : [undefined];

  const createMutation = api.clients.create.useMutation({
    onSuccess: (resp) => {
      toast.success(resp.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = api.clients.update.useMutation({
    onSuccess: (resp) => {
      toast.success(resp.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (data: ClientForm) => {
    try {
      if (mode === "edit") {
        await updateMutation.mutateAsync(data);
      } else {
        await createMutation.mutateAsync(data);
      }

      closeModal();
      methods.reset();
      utils.clients.getMany.invalidate();
      utils.clients.getOne.invalidate({ id });
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  // Update form values when client is loaded
  React.useEffect(() => {
    if (isEdition && client) {
      methods.reset(getDefaultFormEditValues(client));
    }
  }, [client, isEdition, methods]);

  return {
    methods,
    handleSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
}
