import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Status } from "@/generated/prisma";

export const runtime = "nodejs";

// update the job
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData();

    const id = Number(params.id);
    const company = formData.get("company") as string;
    const position = formData.get("position") as string;
    const salary = formData.get("salary") as string;
    const appliedDate = formData.get("appliedDate") as string;
    const notes = formData.get("notes") as string;
    const status = formData.get("status") as string;
    const jobLink = formData.get("jobLink") as File | null;

    // save file upload
    let fileUrl = undefined;
    if (jobLink instanceof File) {
      const bytes = await jobLink.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // save to public/uploads
      const fileName = `${Date.now()}-${jobLink.name}`;
      const fs = require("fs");
      fs.writeFileSync(`public/uploads/${fileName}`, buffer);

      fileUrl = `/uploads/${fileName}`;
    }

    const updated = await prisma.job.update({
      where: { id },
      data: {
        company,
        position,
        salary,
        appliedDate: new Date(appliedDate),
        notes,
        status: status ? (status as Status) : undefined,
        jobLink: fileUrl ?? undefined,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

//delete job application
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid job ID format" },
        { status: 400 }
      );
    }

    const deletedJob = await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json(deletedJob);
  } catch (err: any) {
    console.error("DELETE ERROR:", err);

    if (err.code === "P2025") {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

