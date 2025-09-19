"use client";

import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import React from "react";

const muiCache = createCache({ key: "mui", prepend: true });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CacheProvider value={muiCache}>{children}</CacheProvider>
    </SessionProvider>
  );
}
