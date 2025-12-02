import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Status } from "@/generated/prisma";

export const runtime = "nodejs";



export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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

    // OPTIONAL: save file upload
    let fileUrl = undefined;
    if (jobLink instanceof File) {
      const bytes = await jobLink.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // example: save to public/uploads
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



// export async function PUT(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const id          = formData.get("id") as string;
//     const company     = formData.get("company") as string;
//     const position    = formData.get("position") as string;
//     const salary      = formData.get("salary") as string;
//     const appliedDate = formData.get("appliedDate") as string;
//     const notes       = formData.get("notes") as string;
//     const status      = formData.get("status") as string;
//     const jobLink     = formData.get("jobLink") as File | null;

//     if (!id) {
//       return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
//     }

//     let resumeUrl: string | null = null;

//     if (jobLink && jobLink.size > 0) {
//       const buffer = Buffer.from(await jobLink.arrayBuffer());
//       const filename = `resume-${Date.now()}-${jobLink.name}`;
//       const uploadDir = path.join(process.cwd(), "public/uploads");

//       await fs.mkdir(uploadDir, { recursive: true });

//       const filePath = path.join(uploadDir, filename);
//       await fs.writeFile(filePath, buffer);

//       resumeUrl = filename;
//     }

//     const session = await getServerSession(authOptions);
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const updateData: any = {
//       company,
//       position,
//       salary,
//       appliedDate: new Date(appliedDate),
//       notes,
//       status, // <-- Make sure this is included
//     };

//     if (resumeUrl) updateData.jobLink = resumeUrl;

//     const updatedJob = await db.job.update({
//       where: { id: Number(id), userId: Number(session.user.id) },
//       data: updateData,
//     });

//     return NextResponse.json(updatedJob);
//   } catch (error) {
//     console.error("Error updating job:", error);
//     return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
//   }
// }

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = parseInt(params.id);
//   try {
//     const post = await db.post.findUnique({
//       where: { id },
//       include: { author: true, media: true },
//     });
//     return NextResponse.json(post);
//   } catch (error) {
//     console.error("Failed to fetch post by ID:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch post by ID" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = parseInt(params.id);

//   try {
//     // Find the post first to get media paths
//     const post = await db.job.findUnique({
//       where: { id },
//       include: { media: true },
//     });

//     if (!post)
//       return NextResponse.json({ error: "Post not found" }, { status: 404 });

//     // Delete the media files from disk
//     for (const m of post.media ?? []) {

//       const relativePath = m.url.startsWith("/") ? m.url.slice(1) : m.url;
//       const filePath = path.join(process.cwd(), "public", relativePath);

//       try {
//         await fs.unlink(filePath);
//         console.log("Deleted file:", filePath);
//       } catch (err) {
//         console.warn("Could not delete file:", filePath, err);
//       }
//     }

//     //  Delete the post and media records from DB
//     await db.media.deleteMany({ where: { postId: id } });
//     await db.post.delete({ where: { id } });

//     return NextResponse.json({
//       message: "Post and files deleted successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to delete post" },
//       { status: 500 }
//     );
//   }
// }
