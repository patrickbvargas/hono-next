import { usePathname } from "next/navigation";
import type { RouteSection } from "../types/route";
import { cn, Listbox, ListboxItem, ListboxSection } from "@heroui/react";

interface NavigationProps {
  sections: RouteSection[];
}

export function NavSection({ sections }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (url: string) => pathname.startsWith(url);

  return (
    <nav className="flex-1">
      <Listbox
        items={sections}
        classNames={{ list: "h-full px-2", base: "h-full" }}
      >
        {({ name, routes }) => (
          <ListboxSection
            key={name}
            title={name}
            items={routes}
            className="last:mt-auto"
            classNames={{ group: "space-y-1" }}
          >
            {({ title, url, icon: Icon }) => (
              <ListboxItem
                key={title}
                href={url}
                startContent={<Icon size={16} />}
                className={cn(isActive(url) && "border-l-4 border-primary")}
              >
                {title}
              </ListboxItem>
            )}
          </ListboxSection>
        )}
      </Listbox>
    </nav>
  );
}
