"use client";

import {
  WrapperBody,
  WrapperFooter,
  WrapperHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  ButtonFilter,
} from "./";
import { useIsMobile } from "~/shared/hooks";

export const EntityFilterHeader = WrapperHeader;
export const EntityFilterBody = WrapperBody;
export const EntityFilterFooter = WrapperFooter;

export const EntityFilter = ({
  children,
  ...props
}: React.ComponentProps<typeof Popover>) => {
  const isMobile = useIsMobile();

  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <ButtonFilter />
      </PopoverTrigger>
      <PopoverContent
        align={isMobile ? "end" : "start"}
        className="flex flex-col gap-2"
      >
        {children}
        <Button
          size="sm"
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
