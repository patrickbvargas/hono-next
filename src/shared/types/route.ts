import type { LucideIcon } from "lucide-react";

export interface RouteItem {
  label: string;
  url: `/${string}` | "#";
  icon: LucideIcon;
}

export interface RouteSection {
  name: string;
  routes: RouteItem[];
}
