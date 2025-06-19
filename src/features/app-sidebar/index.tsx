"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  BriefcaseIcon,
  DollarSignIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  Settings2Icon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/shared/components/ui/sidebar";
import Link from "next/link";
import type { RouteItem } from "./types/route";
import { NavUser } from "./components/nav-user";
import { NavGroup } from "./components/nav-group";

type RouteSection = "main" | "secondary";

const routes: Record<RouteSection, RouteItem[]> = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Clientes",
      url: "/clientes",
      icon: UserIcon,
    },
    {
      title: "Contratos",
      url: "/contratos",
      icon: BriefcaseIcon,
    },
    {
      title: "Funcionários",
      url: "/funcionarios",
      icon: UsersIcon,
    },
    {
      title: "Financeiro",
      url: "#",
      icon: DollarSignIcon,
      items: [
        {
          title: "Honorários",
          url: "/honorarios",
        },
        {
          title: "Remunerações",
          url: "/remuneracoes",
        },
      ],
    },
  ],
  secondary: [
    {
      title: "Configurações",
      url: "/configuracoes",
      icon: Settings2Icon,
    },
    {
      title: "Suporte",
      url: "/suporte",
      icon: LifeBuoyIcon,
    },
  ],
} as const;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <ArrowUpCircleIcon className="size-5" />
                <span className="text-base font-semibold">Hono</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup routes={routes.main} />
        <NavGroup routes={routes.secondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
