import * as React from "react";
import { cn } from "~/shared/lib/utils";
import { AlertTriangleIcon } from "lucide-react";

interface ErrorFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  showIcon?: boolean;
}

export const ErrorFallback = ({
  message = "Ocorreu um erro",
  showIcon = true,
  className,
  ...props
}: ErrorFallbackProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-destructive/50 bg-destructive/10 p-4",
        "flex items-center gap-2 text-destructive",
        className,
      )}
      {...props}
    >
      {showIcon && <AlertTriangleIcon className="h-4 w-4 shrink-0" />}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
