"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { cn } from "~/shared/lib/utils";
import { createPortal } from "react-dom";
import { Button } from "../../ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocalStorage } from "~/shared/hooks";
import { ScrollArea } from "../../ui/scroll-area";
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

  return createPortal(
    <React.Fragment>
      <Button
        variant="default"
        size={isOpen ? "sm" : "icon"}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed z-[10000] bottom-4",
          isOpen
            ? "left-96 w-4 h-6 rounded-tr-sm rounded-br-sm"
            : "bottom-3 left-3 font-semibold text-xs tracking-wide uppercase",
        )}
      >
        {isOpen ? <ChevronLeft size={12} /> : "RHF"}
      </Button>
      <div
        className={cn(
          "fixed top-0 left-0 z-[9999] h-full w-0 overflow-hidden transition-[width] bg-background duration-300 border-r border-r-muted",
          isOpen && "w-96",
        )}
      >
        <ScrollArea className="size-full">
          <div className="p-4">
            <Accordion
              type="multiple"
              value={expandedKeys}
              onValueChange={setExpandedKeys}
            >
              {info.map(({ title, data }) => (
                <AccordionItem
                  key={title}
                  value={title}
                  className="first:text-rose-400"
                >
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent>
                    <pre className="text-xs whitespace-pre-wrap break-words">
                      <code>{JSON.stringify(data, null, 2)}</code>
                    </pre>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </div>
    </React.Fragment>,
    document.body,
  );
};
