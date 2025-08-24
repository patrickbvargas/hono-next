"use client";

import * as React from "react";

export interface UseDisclosureProps {
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (isOpen?: boolean) => void;
}

export function useDisclosure(
  props: UseDisclosureProps = {},
): UseDisclosureReturn {
  const { defaultOpen = false, isOpen: controlledOpen, onOpenChange } = props;

  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const onOpen = React.useCallback(() => {
    if (controlledOpen === undefined) {
      setInternalOpen(true);
    }
    onOpenChange?.(true);
  }, [controlledOpen, onOpenChange]);

  const onClose = React.useCallback(() => {
    if (controlledOpen === undefined) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  }, [controlledOpen, onOpenChange]);

  const onToggleOpen = React.useCallback(
    (isOpen?: boolean) => {
      const newValue = isOpen !== undefined ? isOpen : !internalOpen;
      if (controlledOpen === undefined) {
        setInternalOpen(newValue);
      }
      onOpenChange?.(newValue);
    },
    [controlledOpen, internalOpen, onOpenChange],
  );

  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange: onToggleOpen,
  };
}
