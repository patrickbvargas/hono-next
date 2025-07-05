import * as React from "react";
import { cn } from "@heroui/react";
import type { DefinitionItemData } from "~/shared/types/definition-data";

interface DefinitionListProps extends React.HTMLAttributes<HTMLDListElement> {
  data: DefinitionItemData[];
}
export const DefinitionList = ({
  data,
  className,
  ...props
}: DefinitionListProps) => {
  return (
    <dl
      className={cn(
        "grid grid-cols-[100px_1fr] items-center gap-y-4 text-small font-normal",
        className,
      )}
      {...props}
    >
      {data.map((item) => (
        <DefinitionItem key={item.term} {...item} />
      ))}
    </dl>
  );
};

const DefinitionItem = ({ term, definition }: DefinitionItemData) => (
  <React.Fragment>
    <dt className="text-foreground/60">{term}</dt>
    <dd>{definition}</dd>
  </React.Fragment>
);
