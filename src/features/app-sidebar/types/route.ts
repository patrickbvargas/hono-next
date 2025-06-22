import type { LucideIcon } from "lucide-react";

export interface RouteItem {
  title: string;
  url: `/${string}` | "#";
  icon: LucideIcon;
}
