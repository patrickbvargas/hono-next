"use client";

import * as React from "react";
import {
  BoxIcon,
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
  SidebarGroup,
  SidebarHeader,
} from "~/shared/components";
import type { RouteItem } from "./types/route";
import { NavUser } from "./components/nav-user";
import { NavGroup } from "./components/nav-group";
import Link from "next/link";

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
    },
    {
      title: "Honorários",
      url: "/honorarios",
      icon: DollarSignIcon,
    },
    {
      title: "Remunerações",
      url: "/remuneracoes",
      icon: DollarSignIcon,
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
        <NavGroup routes={routes.main} />
        <NavGroup routes={routes.secondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
