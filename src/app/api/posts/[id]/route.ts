// import db from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";
// import fs from "fs/promises";
// import path from "path";

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
