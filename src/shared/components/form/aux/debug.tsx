"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  cn,
  ScrollShadow,
} from "@heroui/react";
import { ChevronLeft } from "lucide-react";
import { useLocalStorage } from "~/shared/hooks";
import { type FieldValues, type UseFormReturn } from "react-hook-form";

export const RHFDebug = <T extends FieldValues>({
  watch,
  formState,
}: Omit<UseFormReturn<T>, "handleSubmit">) => {
  const [isOpen, setIsOpen] = useLocalStorage<boolean>("RHFDebug.open", false);
  const [expandedKeys, setExpandedKeys] = useLocalStorage<string[]>(
    "RHFDebug.expandedKeys",
    [],
  );

  if (process.env.NODE_ENV !== "development") return null;

  const info = [
    { title: "Errors", data: formState.errors },
    { title: "Values", data: watch() },
    { title: "Default Values", data: formState.defaultValues },
    { title: "Touched Fields", data: formState.touchedFields },
    { title: "Dirty Fields", data: formState.dirtyFields },
  ];

  return (
    <React.Fragment>
      <Button
        isIconOnly
        size={isOpen ? "sm" : "lg"}
        radius={isOpen ? "none" : "full"}
        onPress={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed z-[10000] bottom-4",
          isOpen
            ? "left-96 min-w-4 w-4 h-6 rounded-tr-sm rounded-br-sm bg-content2"
            : "bottom-3 left-3 font-semibold text-xs tracking-wide uppercase",
        )}
      >
        {isOpen ? <ChevronLeft size={12} /> : "RHF"}
      </Button>
      <Card
        radius="none"
        className={cn(
          "fixed top-0 left-0 z-[9999] h-screen w-0 overflow-hidden transition-[width] duration-300",
          isOpen && "w-96",
        )}
      >
        <CardBody className="space-y-2">
          <ScrollShadow hideScrollBar className="h-full">
            <Accordion
              selectionMode="multiple"
              defaultExpandedKeys={expandedKeys}
              onExpandedChange={(v) =>
                setExpandedKeys(Array.from(v).map(String))
              }
              itemClasses={{
                content: "mb-2",
                title: "text-xs font-semibold uppercase",
              }}
            >
              {info.map(({ title, data }) => (
                <AccordionItem
                  key={title}
                  title={title}
                  className="first:text-rose-400"
                >
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollShadow>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
