import { Separator } from "../../ui";
import { cn } from "~/shared/lib/utils";

export const RHFDivider = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Separator>) => {
  return (
    <Separator
      orientation="horizontal"
      className={cn("max-w-5", className)}
      {...props}
    />
  );
};
