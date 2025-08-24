import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/shared/components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RouteSection } from "~/shared/types/route";

interface NavigationProps {
  sections: RouteSection[];
}

export function NavSection({ sections }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (url: string) => pathname.startsWith(url);

  return (
    <>
      {sections.map(({ name, routes }) => (
        <SidebarGroup key={name}>
          <SidebarGroupLabel>{name}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map(({ label, url, icon: Icon }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    asChild
                    tooltip={label}
                    isActive={isActive(url)}
                  >
                    <Link href={url}>
                      <Icon size={16} />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
