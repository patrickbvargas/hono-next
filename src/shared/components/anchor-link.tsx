import * as React from "react";
import Link from "next/link";
import { cn } from "~/shared/lib/utils";
import { LinkIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./";

interface AnchorLinkProps extends React.ComponentProps<typeof Link> {
  tooltipText?: string;
  children: React.ReactNode;
  className?: string;
}

export const AnchorLink = ({
  tooltipText = "Ver detalhes",
  children,
  className,
  ...props
}: AnchorLinkProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            className={cn(
              "inline-flex items-center text-foreground hover:underline transition-colors",
              className,
            )}
            {...props}
          >
            {children}
            <LinkIcon size={14} className="ml-2" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
