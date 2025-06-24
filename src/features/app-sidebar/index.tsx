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
  SidebarHeader,
} from "~/shared/components";
import Link from "next/link";
import { NavUser } from "./components/nav-user";
import type { RouteSection } from "./types/route";
import { NavSection } from "./components/nav-section";

const sections: RouteSection[] = [
  {
    name: "Geral",
    routes: [
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
    ],
  },
  {
    name: "Financeiro",
    routes: [
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
  },
  {
    name: "Equipe",
    routes: [
      {
        title: "Funcionários",
        url: "/funcionarios",
        icon: UsersIcon,
      },
    ],
  },
  {
    name: "Suporte",
    routes: [
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
