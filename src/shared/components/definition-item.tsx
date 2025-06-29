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
        "flex flex-col gap-1 text-foreground text-small font-normal",
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
    <dt className="truncate font-semibold">{term}</dt>
    <dd className="not-last-of-type:mb-2">{definition}</dd>
  </React.Fragment>
);
