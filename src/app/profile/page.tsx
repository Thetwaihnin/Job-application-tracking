import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ProfilePic from "../component/ProfilePic";
import PostCard from "../component/PostCard";

export default async function ProfilePage() {
  // 1️⃣ Get the session on the server
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Please log in to view your profile.</Typography>
      </Box>
    );
  }

  // Fetch the user from the database
  const user = await db.user.findUnique({
    where: { id: Number(session.user.id) },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });

  const posts = await db.user.findUnique({
    where: { id: Number(session.user.id) },
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
      posts: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          media: {
            select: {
              id: true,
              url: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!posts) {
    console.log("there's no posts related to this user");
  } else {
    console.log(posts);
  }

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>User not found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#1B3F3C",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE & Edge
        "&::-webkit-scrollbar": {
          display: "none", // Chrome, Safari
        },
      }}
    >
      <Box sx={{ position: "relative", width: "100%" }}>
        <Box
          sx={{
            height: "150px",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            src="/Halloween.jpg"
            alt="background image"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: "15%",
            bottom: "-60px",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <ProfilePic />
        </Box>
      </Box>

      <Box sx={{ color: "white", mt: 8, p: 2, mx: 2 }}>
        <Typography sx={{ color: "white" }}>{user.name}</Typography>
        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#CECECE",
            mt: 1,
            fontFamily: "sans-serif",
          }}
        >
          Joined {user.createdAt.toDateString()}
        </Typography>
      </Box>

      <Box>
        {posts?.posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            content={post.content}
            author={{
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image ?? undefined,
            }}
            createdAt={post.createdAt.toDateString()}
            media={post.media ?? []}
          />
        ))}
      </Box>
    </Box>
  );
}
