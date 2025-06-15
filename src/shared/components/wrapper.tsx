import * as React from "react";
import { cn } from "~/shared/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

function Wrapper({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "size-full grid grid-rows-[auto_1fr_auto] gap-3 overflow-hidden",
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
}: React.ComponentProps<typeof ScrollArea>) {
  return (
    <ScrollArea
      className={cn("flex flex-col gap-3 overflow-hidden", className)}
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
