// app/api/enum/status/route.ts
import { Status } from "@/generated/prisma";
import { NextResponse } from "next/server";
// import Status  from "@prisma/client";

export async function GET() {
  return NextResponse.json(Object.values(Status));
}
