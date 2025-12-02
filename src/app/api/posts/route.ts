import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
// import { get } from "http";
// import formidable, { File, Fields, Files } from "formidable";
export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  try {
    const jobs = await db.job.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const company     = formData.get("company") as string;
    const position    = formData.get("position") as string;
    const salary      = formData.get("salary") as string;
    const appliedDate = formData.get("appliedDate") as string;
    const notes       = formData.get("notes") as string;
    const jobLink      = formData.get("jobLink") as File | null;

    let resumeUrl = null;
    if (jobLink) {
      const buffer = Buffer.from(await jobLink.arrayBuffer());
      const filename = `resume-${Date.now()}-${jobLink.name}`;

      const filePath = path.join(process.cwd(), "public/uploads", filename);
      await fs.promises.writeFile(filePath, buffer);

      resumeUrl = `${filename}`;
    }

    const session = await getServerSession(authOptions);

    const newPost = await db.job.create({
      data: {
        company,
        position,
        status: "APPLIED",
        salary,
        appliedDate: new Date(appliedDate),
        jobLink: resumeUrl,
        notes,
        userId: Number(session?.user?.id),
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}




