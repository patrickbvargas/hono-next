import { cn } from "@heroui/react";

interface RHFFieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  title?: string;
}

export const RHFFieldset = ({
  children,
  title,
  className,
  ...props
}: RHFFieldsetProps) => {
  return (
    <fieldset
      className={cn("w-full flex gap-x-2 gap-y-4", className)}
      {...props}
    >
      {title && (
        <legend className="text-xs font-semibold uppercase tracking-wider truncate mb-2">
          {title}
        </legend>
      )}
      {children}
    </fieldset>
  );
};
