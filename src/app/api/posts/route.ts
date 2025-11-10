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
    // const jobLink     = formData.get("jobLink") as string;
    const notes       = formData.get("notes") as string;
    const jobLink      = formData.get("jobLink") as File | null;

    // ✅ You must upload the file somewhere (filesystem / S3)
    let resumeUrl = null;
    if (jobLink) {
      // Example: save to /public/uploads
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


// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { error: "Not authenticated" },
//         { status: 401 }
//       );
//     }

//     const body = await req.json();
//     const {
//       company,
//       position,
//       status,
//       salary,
//       appliedDate,
//       jobLink,
//       notes,
//     } = body;

//     const newJob = await db.job.create({
//       data: {
//         company,
//         position,
//         status: status?.toUpperCase(), 
//         salary,
//         jobLink,
//         notes,
//         appliedDate: appliedDate ? new Date(appliedDate) : undefined, 
//         userId: Number(session.user.id),
//       },
//     });

//     return NextResponse.json(newJob);
//   } catch (error) {
//     console.error("Failed to create job:", error);
//     return NextResponse.json(
//       { error: "Failed to create job" },
//       { status: 500 }
//     );
//   }
// }


// export async function POST(req: NextRequest) {
//     try {
//             console.log("POST request received");

//         const session = await getServerSession(authOptions);
//         if (!session?.user?.id) {
//             return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//         }

//         const form = formidable({ multiples: true, uploadDir: "./public/uploads", keepExtensions: true });

//         const data: any = await new Promise((resolve, reject) => {
//             form.parse(req as any, (err, fields, files) => {
//                 if (err) reject(err);
//                 resolve({ fields, files });
//             });
//         });

//         // Ensure title and content are correctly extracted from fields
//         const title = Array.isArray(data.fields.title) ? data.fields.title[0] : data.fields.title;
//         const content = Array.isArray(data.fields.content) ? data.fields.content[0] : data.fields.content;

//         const uploadedFiles = Array.isArray(data.files.images)
//             ? data.files.images
//             : (data.files.images ? [data.files.images] : []);

//         const imageUrls = uploadedFiles.map((file: any) => "/uploads/" + file.newFilename);

//         // create Post + related Media
//         const newPost = await db.post.create({
//             data: {
//                 title: title as string,
//                 content: content as string,
//                 authorId: Number(session.user.id),
//                 media: {
//                     create: imageUrls.map((url: string) => ({ url, type: 'IMAGE' })), // Added media type
//                 },
//             },
//             include: { media: true },
//         });

//         return NextResponse.json(newPost);
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
//     }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }
//     const data = await req.json();
//     const { title, content } = data;
//   const newPost = await db.post.create({
//     data: { title, content, authorId: Number(session?.user?.id) },
//   });
//   return NextResponse.json(newPost);
// } catch (error) {
//   return NextResponse.json(
//     { error: "Failed to create post" },
//     { status: 500 }
//   );
// }
// }

// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);
//     const formData = await req.formData();
//     const title = formData.get("title") as string;
//     const content = formData.get("content") as string;
//     const authorId = formData.get("authorId") as string;

//     const images = formData.getAll("images"); // array of File objects

//     console.log("Form Data:", { title, content, authorId, images });

//     const uploadDir = path.join(process.cwd(), "public/uploads");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//     const imageUrls: string[] = [];

//     for (const file of images) {
//       if (file instanceof Blob) {
//         const buffer = Buffer.from(await file.arrayBuffer());
//         const filename = `${Date.now()}-${(file as any).name || "file"}`;
//         const filePath = path.join(uploadDir, filename);
//         fs.writeFileSync(filePath, buffer);
//         imageUrls.push("/uploads/" + filename);
//       }
//     }

//     await db.job.create({
//       data: {
//         title,
//         content,
//         authorId: Number(session?.user.id),
//         media: { create: imageUrls.map((url ) => ({ url, type: "IMAGE" })) },
//       },
//       include: { media: true },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json(
//       { error: "Failed to create post" },
//       { status: 500 }
//     );
//   }
// }
