"use client";

import { toast as sonnerToast, type ExternalToast } from "sonner";

function getTimestamp(): string {
  const now = new Date();
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
}

type ToastConfig = ExternalToast;

export const toast = {
  success: (message: string, config?: ToastConfig) =>
    sonnerToast.success(message, {
      description: getTimestamp(),
      ...config,
    }),

  error: (message: string, config?: ToastConfig) =>
    sonnerToast.error(message, {
      description: getTimestamp(),
      ...config,
    }),

  warning: (message: string, config?: ToastConfig) =>
    sonnerToast.warning(message, {
      description: getTimestamp(),
      ...config,
    }),

  info: (message: string, config?: ToastConfig) =>
    sonnerToast.info(message, {
      description: getTimestamp(),
      ...config,
    }),
};
