import ClientWrapper from "@/app/component/ClientWrapper";
import { Grid } from "@mui/material";
import React from "react";

export default function RootLayout({
  children,
  posts,
}: Readonly<{
  children: React.ReactNode;
  posts?: React.ReactNode;
}>) {
  return (
    <ClientWrapper>
      {children}
    </ClientWrapper>
  );
}
