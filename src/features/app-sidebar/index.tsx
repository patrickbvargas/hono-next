"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "~/shared/components/ui/sidebar";
import { NavUser } from "./components/nav-user";
import { ROUTES } from "~/shared/constants/route";
import { NavHeader } from "./components/nav-header";
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
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
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
