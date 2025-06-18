"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  BriefcaseIcon,
  LayoutDashboardIcon,
  ReceiptIcon,
  ScaleIcon,
  Settings2Icon,
  UserIcon,
  WalletMinimalIcon,
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
import type { Route } from "./types/route";
import { NavMain } from "./components/nav-main";
import { NavUser } from "./components/nav-user";

const routes: Route[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    Icon: LayoutDashboardIcon,
  },
  {
    title: "Funcionários",
    url: "/funcionarios",
    Icon: ScaleIcon,
  },
  {
    title: "Clientes",
    url: "/clientes",
    Icon: UserIcon,
  },
  {
    title: "Contratos",
    url: "/contratos",
    Icon: BriefcaseIcon,
  },
  {
    title: "Honorários",
    url: "/honorarios",
    Icon: ReceiptIcon,
  },
  {
    title: "Remunerações",
    url: "/remuneracoes",
    Icon: WalletMinimalIcon,
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    Icon: Settings2Icon,
  },
] as const;

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
              <Link href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Hono</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain routes={routes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
