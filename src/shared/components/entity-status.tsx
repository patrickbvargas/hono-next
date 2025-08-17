import { Badge } from "./ui/badge";
import { formatter } from "~/shared/lib/formatter";
import type { EntityStatus as DrizzleEntityStatus } from "~/shared/types/drizzle";

interface EntityStatusProps {
  status: DrizzleEntityStatus;
}

export const EntityStatus = ({ status, ...props }: EntityStatusProps) => {
  return <Badge>{formatter.entityStatus(status)}</Badge>;
};
