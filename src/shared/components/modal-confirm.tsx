"use client";

import * as React from "react";
import {
  cn,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type ModalProps,
} from "@heroui/react";
import { CheckIcon, XIcon } from "lucide-react";

export interface ModalConfirmProps extends Omit<ModalProps, "children"> {
  onConfirm: () => void;
  title?: string;
  description: string;
  hideTitle?: boolean;
  hideIcons?: boolean;
  isCompact?: boolean;
  isLoading?: boolean;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
}
export const ModalConfirm = ({
  onConfirm,
  description,
  title = "Confirmação",
  confirmButtonLabel = "Sim",
  cancelButtonLabel = "Não",
  hideTitle = false,
  hideIcons = false,
  isCompact = false,
  isLoading = false,
  isOpen,
  onOpenChange,
}: ModalConfirmProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <React.Fragment>
            {!hideTitle && <ModalHeader>{title}</ModalHeader>}
            <ModalBody className={cn(hideTitle && "pt-4")}>
              <p>{description}</p>
            </ModalBody>
            <ModalFooter
              className={cn(
                "flex",
                isCompact ? "justify-end gap-4" : "justify-between",
              )}
            >
              <Button
                color="success"
                onPress={onConfirm}
                isDisabled={isLoading}
                startContent={!hideIcons && <CheckIcon size={20} />}
              >
                {confirmButtonLabel}
              </Button>
              <Button
                color="danger"
                onPress={onClose}
                isLoading={isLoading}
                startContent={!hideIcons && <XIcon size={20} />}
              >
                {cancelButtonLabel}
              </Button>
            </ModalFooter>
          </React.Fragment>
        )}
      </ModalContent>
    </Modal>
  );
};
