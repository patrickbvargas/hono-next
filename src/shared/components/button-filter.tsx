import { Button } from "./";
import { FunnelIcon } from "lucide-react";
import { useIsMobile } from "~/shared/hooks";

export const ButtonFilter = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) => {
  const isMobile = useIsMobile();

  return (
    <Button
      variant="outline"
      size={isMobile ? "icon" : "default"}
      aria-label="Filter"
      {...props}
    >
      <FunnelIcon size={16} aria-hidden="true" className="opacity-60" />
      <span className="hidden md:inline">Filtros</span>
    </Button>
  );
};
