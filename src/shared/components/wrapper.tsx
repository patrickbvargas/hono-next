import * as React from "react";
import { cn } from "@heroui/react";
import { SidebarTrigger } from "./ui";

export const Wrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="wrapper"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
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
      className={cn("flex items-center gap-3 h-12", className)}
      {...props}
    >
      <SidebarTrigger />
      {children}
    </div>
  );
};

export const WrapperBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="wrapper-content"
      className={cn("flex flex-col gap-3", className)}
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
  <h1
    className={cn(
      "max-w-full text-xl sm:text-1xl font-medium uppercase tracking-wider text-foreground sm:truncate",
      className,
    )}
    {...props}
  >
    {title}
  </h1>
);
