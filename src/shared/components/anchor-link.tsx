import { LinkIcon } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { Link, type LinkProps } from "@heroui/link";

export const AnchorLink = ({ ...props }: LinkProps) => {
  return (
    <Tooltip content="Ver detalhes">
      <Link
        size="sm"
        underline="hover"
        showAnchorIcon
        color="foreground"
        anchorIcon={<LinkIcon size={14} className="ml-2" />}
        {...props}
      />
    </Tooltip>
  );
};
