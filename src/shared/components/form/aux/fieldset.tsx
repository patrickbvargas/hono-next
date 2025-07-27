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
      className={cn("w-full flex flex-col gap-2", className)}
      {...props}
    >
      {title && (
        <legend className="text-xs uppercase font-semibold tracking-wide truncate mb-2">
          {title}
        </legend>
      )}
      {children}
    </fieldset>
  );
};
