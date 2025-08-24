import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  DefinitionList,
  Button,
} from "./";
import { cn } from "~/shared/lib/utils";
import type { EntityPanelData } from "~/shared/types/entity-data";

export const EntityPanelHeader = SheetHeader;
export const EntityPanelTitle = SheetTitle;
export const EntityPanelDescription = SheetDescription;

export const EntityPanel = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Sheet>) => {
  return (
    <Sheet {...props}>
      <SheetContent side="right" className="gap-0">
        {children}
      </SheetContent>
    </Sheet>
  );
};

export const EntityPanelBody = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex-1 overflow-auto px-4", className)} {...props} />
  );
};

interface EntityPanelAccordionProps {
  data: EntityPanelData[];
}
export const EntityPanelAccordion = ({
  data,
  ...props
}: EntityPanelAccordionProps) => {
  const defaultValue = data.map(({ title }) => title);

  return (
    <Accordion type="multiple" defaultValue={defaultValue} {...props}>
      {data.map(({ title, data: itemData }) => (
        <AccordionItem key={title} value={title}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>
            <DefinitionList data={itemData} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const EntityPanelFooter = ({
  className,
  ...props
}: React.ComponentProps<typeof SheetFooter>) => {
  return <SheetFooter className={cn(className)} {...props} />;
};

interface EntityPanelActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}
export const EntityPanelActions = ({
  onEdit,
  onDelete,
}: EntityPanelActionsProps) => {
  return (
    <>
      <Button variant="outline" onClick={onEdit}>
        Editar
      </Button>
      <Button variant="destructive" onClick={onDelete}>
        Excluir
      </Button>
    </>
  );
};
