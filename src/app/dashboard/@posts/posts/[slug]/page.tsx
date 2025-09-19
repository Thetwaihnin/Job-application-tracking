import Button from "@/app/component/redirectButton/Button";
import db from "@/lib/db";
import { Box, Typography } from "@mui/material";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await db.post.findUnique({
    where: { id: Number(slug) },
    include: { author: true },
  });

  if (!post) return;
  
  return (
    <Box
      component="section"
      sx={{ padding: 3, display: "flex", flexDirection: "column" }}
    >
      <Button/>
      <Box sx={{ marginTop: 2, textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontFamily: "Libertinus San" }}>
          {post.title}
        </Typography>
      </Box>

      <Box sx={{ marginTop: 4, textAlign: "start" }}>
        <Typography variant="h5" sx={{ fontFamily: "Libertinus San" }}>
          {post.content}
        </Typography>
      </Box>
    </Box>
  );
}
