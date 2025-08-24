import { Button } from "./";
import { PlusIcon } from "lucide-react";
import { cn } from "~/shared/lib/utils";
import { useIsMobile } from "~/shared/hooks";

export const ButtonNew = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) => {
  const isMobile = useIsMobile();

  return (
    <Button
      variant="outline"
      size={isMobile ? "icon" : "default"}
      className={cn("place-self-end", className)}
      aria-label="Novo"
      {...props}
    >
      <PlusIcon size={16} aria-hidden="true" className="opacity-60" />
      <span className="hidden md:inline">Novo</span>
    </Button>
  );
};
