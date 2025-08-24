"use client";

import * as React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./";
import { cn } from "~/shared/lib/utils";

export interface ModalConfirmProps {
  onConfirm: () => void;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  title?: string;
  description: string;
  hideTitle?: boolean;
  isLoading?: boolean;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
}
export const ModalConfirm = ({
  onConfirm,
  description,
  title = "Confirmação",
  confirmButtonLabel = "Sim",
  cancelButtonLabel = "Cancelar",
  hideTitle = false,
  isLoading = false,
  isOpen,
  onOpenChange,
}: ModalConfirmProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        {!hideTitle && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className={cn(hideTitle && "pt-4")}>
          <p>{description}</p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            isDisabled={isLoading}
          >
            {cancelButtonLabel}
          </Button>
          <Button
            onClick={() => onConfirm()}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            {confirmButtonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
