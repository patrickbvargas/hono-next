"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "~/shared/components";
import Link from "next/link";
import { BoxIcon } from "lucide-react";
import { NavUser } from "./components/nav-user";
import { ROUTES } from "~/shared/constants/route";
import { NavSection } from "./components/nav-section";
import type { RouteSection } from "~/shared/types/route";

const sections: RouteSection[] = [
  {
    name: "Geral",
    routes: [ROUTES.dashboard, ROUTES.client, ROUTES.contract],
  },
  {
    name: "Financeiro",
    routes: [ROUTES.fee, ROUTES.remuneration],
  },
  {
    name: "Equipe",
    routes: [ROUTES.employee],
  },
  {
    name: "Suporte",
    routes: [ROUTES.setting, ROUTES.support],
  },
] as const;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2 p-2 pl-4 hover:text-primary transition-colors duration-200 ease-in-out"
        >
          <BoxIcon size={24} />
          <span className="font-semibold tracking-wider">Hono</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavSection sections={sections} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
