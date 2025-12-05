// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import Dashboard from "./dashboard/page";
// import { Box } from "@mui/material";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/login");
//   } else {
//     redirect("/dashboard");
//   }

// }


'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Register from "./register/Register";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  if (!session) return <Register />;

  return null; 
}

