"use client";

import { FunnelIcon } from "lucide-react";
import { useIsMobile } from "~/shared/hooks";
import { Button, cn, type ButtonProps } from "@heroui/react";

export const ButtonFilter = ({ className, ...props }: ButtonProps) => {
  const isMobile = useIsMobile();

  return (
    <Button
      variant="flat"
      isIconOnly={isMobile}
      aria-label="Filtros"
      className={cn("bg-content2", className)}
      {...props}
    >
      <FunnelIcon size={16} className="opacity-60" />
      <span className="hidden md:inline">Filtros</span>
    </Button>
  );
};
