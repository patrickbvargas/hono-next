import type { LucideIcon } from "lucide-react";

export interface Route {
  title: string;
  url: `/${string}` | "#";
  icon?: LucideIcon;
}

export type RouteItem = Route & { items?: Route[] };
