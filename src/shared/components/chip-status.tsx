import { formatter } from "~/shared/lib/formatter";
import { Chip, type ChipProps } from "@heroui/chip";
import type { EntityStatus } from "~/shared/types/drizzle";

interface ChipStatusProps extends ChipProps {
  status: EntityStatus;
}

export const ChipStatus = ({ status, ...props }: ChipStatusProps) => {
  return (
    <Chip
      size="sm"
      variant="dot"
      color="success"
      className="border-none -ml-1.5"
      {...props}
    >
      {formatter.entityStatus(status)}
    </Chip>
  );
};
