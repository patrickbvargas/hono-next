import * as React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type ModalProps,
  type ModalFooterProps,
} from "@heroui/modal";
import { cn } from "@heroui/react";
import { Button } from "@heroui/button";

export const EntityFormHeader = ModalHeader;
export const EntityFormBody = ModalBody;

interface EntityFormProps extends ModalProps {}

export const EntityForm = ({ children, ...props }: EntityFormProps) => {
  return (
    <Modal
      size="xl"
      scrollBehavior="inside"
      classNames={{
        header: "border-b border-divider",
      }}
      {...props}
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

export const EntityFormFooter = ({ className, ...props }: ModalFooterProps) => {
  return (
    <ModalFooter
      className={cn(
        "flex justify-end gap-2 border-t border-divider pt-4",
        className,
      )}
      {...props}
    />
  );
};

interface EntityFormActionsProps extends ModalFooterProps {
  onSubmit?: () => void;
  onCancel: () => void;
  submitButtonLabel?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}
export const EntityFormActions = ({
  onSubmit,
  onCancel,
  submitButtonLabel = "Salvar",
  isLoading,
  isDisabled,
}: EntityFormActionsProps) => {
  return (
    <React.Fragment>
      <Button variant="light" onPress={onCancel}>
        Cancelar
      </Button>
      <Button
        color="primary"
        type="submit"
        form="rhf-form"
        onPress={onSubmit}
        isLoading={isLoading}
        isDisabled={isDisabled}
      >
        {submitButtonLabel}
      </Button>
    </React.Fragment>
  );
};
