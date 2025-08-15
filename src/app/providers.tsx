"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { TRPCProvider } from "~/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    <NuqsAdapter>
      <TRPCProvider>
        <HeroUIProvider
          locale="pt-BR"
          navigate={router.push}
          labelPlacement="outside"
          validationBehavior="aria"
        >
          <ThemeProvider attribute="class" forcedTheme="dark">
            <ToastProvider placement="top-center" />
            {children}
          </ThemeProvider>
        </HeroUIProvider>
      </TRPCProvider>
    </NuqsAdapter>
  );
}
