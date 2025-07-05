"use client";

import { Button, cn, type ButtonProps } from "@heroui/react";

interface ButtonEntityRowProps<T> extends ButtonProps {
  onSelectItem: () => void;
}
export const ButtonEntityRow = <T,>({
  onSelectItem,
  className,
  ...props
}: ButtonEntityRowProps<T>) => {
  return (
    <Button
      radius="full"
      variant="light"
      className={cn(
        "-ml-3.5 data-[hover=true]:bg-transparent data-[hover=true]:underline underline-offset-4",
        className,
      )}
      onPress={() => onSelectItem()}
      {...props}
    />
  );
};
