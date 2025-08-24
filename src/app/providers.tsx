"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { TRPCProvider } from "~/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <NuqsAdapter>
      <TRPCProvider>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </TRPCProvider>
    </NuqsAdapter>
  );
}
