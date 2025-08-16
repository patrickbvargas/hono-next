import { cn } from "@heroui/react";

interface ErrorFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}
export const ErrorFallback = ({
  message = "Ocorreu um erro",
  className,
  ...props
}: ErrorFallbackProps) => {
  return (
    <div
      className={cn(
        "p-4 flex items-center justify-center gap-2 border-1 rounded-md",
        "bg-red-100 text-red-600 border-red-200",
        "dark:bg-danger-100 dark:text-red-50 dark:border-danger-200",
        className,
      )}
      {...props}
    >
      <p className="text-xs uppercase font-medium tracking-wider">{message}</p>
    </div>
  );
};
