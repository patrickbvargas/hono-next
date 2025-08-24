import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "./";

export const EntityFormHeader = DialogHeader;
export const EntityFormTitle = DialogTitle;
export const EntityFormDescription = DialogDescription;

export const EntityForm = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog>) => {
  return (
    <Dialog {...props}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export const EntityFormBody = ({ ...props }: React.ComponentProps<"div">) => {
  return <div {...props} />;
};

export const EntityFormFooter = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogFooter>) => {
  return <DialogFooter {...props} />;
};

interface EntityFormActionsProps {
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
      <Button variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button
        color="primary"
        type="submit"
        form="rhf-form"
        onClick={onSubmit}
        isLoading={isLoading}
        isDisabled={isDisabled}
      >
        {submitButtonLabel}
      </Button>
    </React.Fragment>
  );
};
