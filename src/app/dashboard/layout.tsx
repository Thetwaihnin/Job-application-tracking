import ClientWrapper from "@/app/component/ClientWrapper";
import React from "react";

export default function RootLayout({
  children,
  posts,
  analytic
}: Readonly<{
  children: React.ReactNode;
  posts?: React.ReactNode;
  analytic?: React.ReactNode
}>) {

  return (
    <ClientWrapper>
      {children}
      <div className="grid grid-cols-2 min-h-[100vh] max-h-[100vh] h-[100vh]">
        {analytic}
        {posts}
      </div>
    </ClientWrapper>
  );
}
