import { Button } from "./";
import { PenLineIcon } from "lucide-react";

export const ButtonEdit = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) => {
  return (
    <Button size="icon" variant="ghost" aria-label="Editar" {...props}>
      <PenLineIcon size={16} aria-hidden="true" />
    </Button>
  );
};
