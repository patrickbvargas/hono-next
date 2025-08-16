"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  type PopoverProps,
} from "@heroui/popover";
import { Button } from "@heroui/button";
import { FunnelIcon } from "lucide-react";
import { useIsMobile } from "~/shared/hooks";
import { WrapperBody, WrapperFooter, WrapperHeader } from "./wrapper";

export const EntityFilterHeader = WrapperHeader;
export const EntityFilterBody = WrapperBody;
export const EntityFilterFooter = WrapperFooter;

interface EntityFilterProps extends Omit<PopoverProps, "children"> {
  children: React.ReactNode;
}

export const EntityFilter = ({ children, ...props }: EntityFilterProps) => {
  const isMobile = useIsMobile();

  return (
    <Popover placement={isMobile ? "bottom-end" : "bottom-start"} {...props}>
      <PopoverTrigger>
        <Button
          variant="flat"
          isIconOnly={isMobile}
          aria-label="Filtros"
          className="bg-content2"
        >
          <FunnelIcon size={16} className="opacity-60" />
          <span className="hidden md:inline">Filtros</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 gap-4">
        <p className="place-self-start text-xs font-semibold uppercase tracking-wider">
          Filtros
        </p>
        {children}
        <Button
          size="sm"
          color="primary"
          type="submit"
          form="rhf-form"
          className="place-self-end"
        >
          Aplicar
        </Button>
      </PopoverContent>
    </Popover>
  );
};
