import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  type DrawerProps,
  type DrawerFooterProps,
} from "@heroui/drawer";
import {
  Accordion,
  AccordionItem,
  type AccordionProps,
} from "@heroui/accordion";
import { cn } from "@heroui/react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { DefinitionList } from "./definition-item";
import { PenLineIcon, TrashIcon } from "lucide-react";
import type { EntityPanelData } from "~/shared/types/entity-data";

export const EntityPanelHeader = DrawerHeader;
export const EntityPanelBody = DrawerBody;

// TODO: remove export after refactoring all entities
export interface EntityPanelProps extends Omit<DrawerProps, "children"> {}

export const EntityPanel = ({
  children,
  ...props
}: EntityPanelProps & { children: React.ReactNode }) => {
  return (
    <Drawer
      size="sm"
      motionProps={{
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.1 } },
        exit: { x: 100, opacity: 0, transition: { duration: 0.1 } },
      }}
      classNames={{
        base: "overflow-y-visible",
        wrapper: "app-container",
      }}
      {...props}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
};

export const EntityPanelFooter = ({
  className,
  ...props
}: DrawerFooterProps) => {
  return (
    <DrawerFooter
      className={cn(
        "md:flex-col md:absolute md:top-6 md:-left-12 md:p-0",
        className,
      )}
      {...props}
    />
  );
};

interface EntityPanelAccordionProps extends Omit<AccordionProps, "children"> {
  data: EntityPanelData[];
}
export const EntityPanelAccordion = ({
  data,
  ...props
}: EntityPanelAccordionProps) => {
  return (
    <Accordion
      selectionMode="multiple"
      defaultExpandedKeys={data.map(({ title }) => title)}
      className="p-0"
      itemClasses={{
        title: "text-xs font-semibold uppercase tracking-wider",
        content: "mb-3",
      }}
      {...props}
    >
      {data.map(({ title, data }) => (
        <AccordionItem key={title} title={title}>
          <DefinitionList data={data} />
        </AccordionItem>
      ))}
    </Accordion>
  );
};

interface EntityPanelActionsProps extends DrawerFooterProps {
  onEdit: () => void;
  onDelete: () => void;
}
export const EntityPanelActions = ({
  onEdit,
  onDelete,
}: EntityPanelActionsProps) => {
  return (
    <React.Fragment>
      <Tooltip content="Editar" placement="left">
        <Button isIconOnly onPress={onEdit}>
          <PenLineIcon size={16} />
        </Button>
      </Tooltip>
      <Tooltip content="Excluir" placement="left">
        <Button isIconOnly color="danger" onPress={onDelete}>
          <TrashIcon size={16} />
        </Button>
      </Tooltip>
    </React.Fragment>
  );
};
