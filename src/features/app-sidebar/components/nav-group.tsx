"use client";

import { usePathname } from "next/navigation";
import type { RouteItem } from "../types/route";
import { SidebarGroup } from "~/shared/components";
import { cn, Listbox, ListboxItem } from "@heroui/react";

interface Props extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  routes: RouteItem[];
}

export function NavGroup({ routes, ...props }: Props) {
  const pathname = usePathname();

  return (
    <SidebarGroup {...props}>
      <Listbox>
        {routes.map(({ title, url, icon: Icon }) => {
          const isActive = pathname.startsWith(url);

          return (
            <ListboxItem
              key={title}
              href={url}
              startContent={<Icon size={20} />}
              className={cn(
                "p-2.5 rounded-xl text-default-500",
                isActive && "bg-content2 text-foreground",
              )}
            >
              {title}
            </ListboxItem>
          );
        })}
      </Listbox>
    </SidebarGroup>
  );
}
