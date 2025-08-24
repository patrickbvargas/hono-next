import * as React from "react";
import { cn } from "~/shared/lib/utils";
import { Separator, ScrollArea, SidebarTrigger } from "./";

export const Wrapper = ({
  title,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="wrapper"
      className={cn("flex flex-col gap-3 p-4 pt-1.5 h-full", className)}
      {...props}
    >
      <div className="flex items-center gap-1 h-12 border-b border-border">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {title && <WrapperTitle title={title} />}
      </div>
      {children}
    </div>
  );
};

export const WrapperHeader = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="wrapper-header"
      className={cn(
        "flex items-center gap-2 md:grid md:grid-cols-[380px_auto_1fr] md:gap-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const WrapperBody = ({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea>) => {
  return (
    <ScrollArea
      data-slot="wrapper-content"
      className={cn("flex flex-col gap-3 h-full overflow-auto", className)}
      {...props}
    />
  );
};

export const WrapperFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="wrapper-footer"
      className={cn("flex justify-end items-center gap-3", className)}
      {...props}
    />
  );
};

interface WrapperTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}
export const WrapperTitle = ({
  title,
  className,
  ...props
}: WrapperTitleProps) => (
  <h1 className={cn("text-base font-medium", className)} {...props}>
    {title}
  </h1>
);
