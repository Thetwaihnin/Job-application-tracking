import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { get } from "http";
// import formidable, { File, Fields, Files } from "formidable";
export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  try {
    // Removed the orderBy clause to prevent potential server errors
    const posts = await db.post.findMany({
      include: { author: true, media: true },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

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
//     const newPost = await db.post.create({
//       data: { title, content, authorId: Number(session?.user?.id) },
//     });
//     return NextResponse.json(newPost);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to create post" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const authorId = formData.get("authorId") as string;

    const images = formData.getAll("images"); // array of File objects

    console.log("Form Data:", { title, content, authorId, images });

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const imageUrls: string[] = [];

    for (const file of images) {
      if (file instanceof Blob) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${(file as any).name || "file"}`;
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);
        imageUrls.push("/uploads/" + filename);
      }
    }

    await db.post.create({
      data: {
        title,
        content,
        authorId: Number(session?.user.id),
        media: { create: imageUrls.map((url ) => ({ url, type: "IMAGE" })) },
      },
      include: { media: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
