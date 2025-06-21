"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { TRPCProvider } from "~/trpc/client";
import { HeroUIProvider } from "@heroui/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    <NuqsAdapter>
      <TRPCProvider>
        <HeroUIProvider
          navigate={router.push}
          locale="pt-BR"
          validationBehavior="aria"
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </HeroUIProvider>
      </TRPCProvider>
    </NuqsAdapter>
  );
}
