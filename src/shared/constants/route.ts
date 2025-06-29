import {
  BriefcaseIcon,
  DollarSignIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  Settings2Icon,
  UserIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import type { RouteItem } from "~/shared/types/route";

type RouteName =
  | "dashboard"
  | "client"
  | "contract"
  | "fee"
  | "remuneration"
  | "employee"
  | "setting"
  | "support";

export const ROUTES: Record<RouteName, RouteItem> = {
  dashboard: {
    label: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  client: {
    label: "Clientes",
    url: "/clientes",
    icon: UserIcon,
  },
  contract: {
    label: "Contratos",
    url: "/contratos",
    icon: BriefcaseIcon,
  },
  fee: {
    label: "Honorários",
    url: "/honorarios",
    icon: DollarSignIcon,
  },
  remuneration: {
    label: "Remunerações",
    url: "/remuneracoes",
    icon: WalletIcon,
  },
  employee: {
    label: "Funcionários",
    url: "/funcionarios",
    icon: UsersIcon,
  },
  setting: {
    label: "Configurações",
    url: "/configuracoes",
    icon: Settings2Icon,
  },
  support: {
    label: "Suporte",
    url: "/suporte",
    icon: LifeBuoyIcon,
  },
} as const;
