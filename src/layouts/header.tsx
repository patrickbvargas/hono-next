import * as React from "react";
import { cn, Divider } from "@heroui/react";
import { SidebarTrigger } from "~/shared/components";

export const Header = ({
  className,
  ...props
}: React.ComponentProps<"header">) => {
  return (
    <header
      data-slot="header"
      className={cn(
        "flex h-12 shrink-0 items-center gap-2 border-b border-default",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Divider orientation="vertical" />
        <h1 className="text-base font-medium">Documents</h1>
      </div>
    </header>
  );
};
