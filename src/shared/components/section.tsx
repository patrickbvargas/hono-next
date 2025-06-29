import * as React from "react";
import { cn } from "@heroui/react";

export const Section = ({
  className,
  ...props
}: React.ComponentProps<"section">) => (
  <section
    className={cn("group/section flex flex-col flex-1 gap-1", className)}
    {...props}
  />
);

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}
export const SectionTitle = ({
  title,
  className,
  ...props
}: SectionTitleProps) => {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      <h3
        className={cn(
          "truncate text-small font-semibold uppercase text-foreground",
        )}
      >
        {title}
      </h3>
      <span
        className={cn(
          "h-1 w-0 rounded-full transition-[width] duration-500 bg-primary origin-left group-hover/section:w-5",
        )}
      />
    </div>
  );
};

export const SectionContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("w-full flex flex-col flex-1 gap-4", className)}
    {...props}
  />
);
