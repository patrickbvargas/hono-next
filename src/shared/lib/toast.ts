"use client";

import { addToast, type ToastProps } from "@heroui/react";

type Context = "error" | "warning" | "success" | "info" | "dev";

type ToastOptions = Pick<ToastProps, "title" | "color">;

const defaultTitle: Record<Context, string> = {
  error: "Erro!",
  warning: "Atenção!",
  success: "Sucesso!",
  info: "Informação!",
  dev: "Em desenvolvimento!",
};

const defaultColor: Record<Context, ToastProps["color"]> = {
  error: "danger",
  warning: "warning",
  success: "success",
  info: "default",
  dev: "warning",
};

function showToast(description: string, options: ToastOptions) {
  return addToast({
    description: description,
    ...options,
  });
}

export const heroToast = {
  error: (
    description: string,
    options: ToastOptions = {
      title: defaultTitle.error,
      color: defaultColor.error,
    },
  ) => showToast(description, options),
  warning: (
    description: string,
    options: ToastOptions = {
      title: defaultTitle.warning,
      color: defaultColor.warning,
    },
  ) => showToast(description, options),
  success: (
    description: string,
    options: ToastOptions = {
      title: defaultTitle.success,
      color: defaultColor.success,
    },
  ) => showToast(description, options),
  info: (
    description: string,
    options: ToastOptions = {
      title: defaultTitle.info,
      color: defaultColor.info,
    },
  ) => showToast(description, options),
  dev: (
    description: string,
    options: ToastOptions = {
      title: defaultTitle.dev,
      color: defaultColor.dev,
    },
  ) => showToast(description, options),
};
