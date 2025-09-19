"use client";

import * as React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Box, CardHeader, IconButton, CardMedia } from "@mui/material";
// import Image from "next/image";
import { PostData } from "./Post";

export default function PostCard({
  title,
  content,
  author,
  createdAt,
  media,
}: PostData) {
  return (
    <Box
      sx={{
        width: 400,
        maxWidth: 400,
        minHeight: 200,
        height: "auto",
        maxHeight: 500,
        overflow: "hidden",
        // margin: "20px auto",
        marginLeft: 3,
        marginRight: 0,
      }}
    >
      <Card
        sx={{
          maxWidth: "100%",
          backgroundColor: "#1B3F3C",
          color: "white",
          // backgroundColor: "#2CB4A9",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <CardHeader
          // avatar={
          //   <Avatar sx={{ width: 56, height: 56 }}>
          //     {author.image ? (
          //       <Image
          //         src={author.image}
          //         alt={author.name ?? "Author"}
          //         width={56}
          //         height={56}
          //         style={{ borderRadius: "50%" }}
          //       />
          //     ) : (
          //       author.name?.[0] ?? "?"
          //     )}
          //   </Avatar>
          // }
          sx={{ p: 0, px: 2, pt: 1 }}
          action={
            <IconButton aria-label="settings">
              {/* <MoreVertIcon /> */}...
            </IconButton>
          }
          title={
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
              <Typography
                // variant="h6"
                sx={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: "bold",
                }}
              >
                {author.name ?? "Unknown"}
              </Typography>
              <Typography sx={{ color: "#2CB4A9" }}>
                {new Date(createdAt).toLocaleString()}
              </Typography>
            </Box>
          }
          // subheader={
          //   <Typography sx={{ color: "#2CB4A9" }}>
          //     {new Date(createdAt).toLocaleString()}
          //   </Typography>
          // }
        />

        <CardContent sx={{ py: 0, px: 2 }}>
          {/* {media && media.length > 0 && (
            <CardMedia
              component="img"
              sx={{
                maxHeight: 200, // 👈 limit image height
                maxWidth: "100%", // 👈 don’t overflow card
                objectFit: "cover", // 👈 crop image instead of distortion
                borderRadius: 2, // optional rounded corners
              }}
              image={media[0].url}
              alt={title}
            />
          )} */}
          <Typography
            // variant="h"
            sx={{
              fontFamily: "Playfair Display, serif",
              color: "white",
              // whiteSpace: "nowrap",
              // overflow: "hidden",
              marginBottom: 2,
              // textOverflow: "ellipsis",
            }}
          >
            {content}
          </Typography>
          {media && media.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: media.length > 1 ? "1fr 1fr" : "1fr",
                gap: 1,
              }}
            >
              {media.map((m, i) => (
                <CardMedia
                  key={i}
                  component="img"
                  image={m.url}
                  alt={`${title}-${i}`}
                  sx={{
                    maxHeight: 200,
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              ))}
            </Box>
          )}

          {/* <Typography
            gutterBottom
            variant="h5"
            sx={{ fontFamily: "Playfair Display, serif" }}
          >
            {title}
          </Typography> */}
          <Typography variant="caption" sx={{ display: "block", marginTop: 1 }}>
            By {author.name ?? "Anonymous"} •{" "}
            {new Date(createdAt).toLocaleString()}
          </Typography>
        </CardContent>

        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </Box>
  );
}
