import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = parseInt(session.user.id, 10); // NextAuth gives id as string

  try {
    // Count jobs per status in parallel
    const [applied, interview, offer, rejected] = await Promise.all([
      db.job.count({ where: { userId, status: "APPLIED" } }),
      db.job.count({ where: { userId, status: "INTERVIEW" } }),
      db.job.count({ where: { userId, status: "OFFER" } }),
      db.job.count({ where: { userId, status: "REJECTED" } }),
    ]);

    return NextResponse.json({
      APPLIED: applied,
      INTERVIEW: interview,
      OFFER: offer,
      REJECTED: rejected,
      total: applied + interview + offer + rejected,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
