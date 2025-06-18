import * as React from "react";
import { cn } from "~/shared/lib/utils";

function Wrapper({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="wrapper"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

function WrapperHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="wrapper-header"
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  );
}

function WrapperBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="wrapper-content"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

function WrapperFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="wrapper-footer"
      className={cn("flex justify-end items-center gap-3", className)}
      {...props}
    />
  );
}

export { Wrapper, WrapperHeader, WrapperBody, WrapperFooter };
