import * as React from "react";
import { cn } from "~/shared/lib/utils";

function Wrapper({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "size-full flex flex-col gap-3 p-1 overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function WrapperHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props} />
  );
}

function WrapperContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 flex flex-col gap-3 overflow-auto", className)}
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
      className={cn("flex justify-end items-center gap-3", className)}
      {...props}
    />
  );
}

export { Wrapper, WrapperHeader, WrapperContent, WrapperFooter };
