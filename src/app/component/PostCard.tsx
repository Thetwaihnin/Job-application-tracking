"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, CardHeader, IconButton, CardMedia } from "@mui/material";
// import Image from "next/image";
import { PostData } from "./Post";
import LongMenu from "./post/MenuOption";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

export default function PostCard({
  id,
  content,
  author,
  createdAt,
  media,
}: PostData) {
  const [likeClick, setLikeClick] = React.useState(false);
  const [commentClick, setCommentClick] = React.useState(false);
  const [bookmarkClick, setBookmarkClick] = React.useState(false);
  const [shareClick, setShareClick] = React.useState(false);

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
        border: "1px"
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
        {" "}
        <CardHeader
          sx={{ p: 0, px: 2, pt: 1 }}
          action={<LongMenu id={id} />}
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
                  alt="post content"
                  // alt={`${title}-${i}`}
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
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            pb: 2,
            px: 2,
          }}
        >
          <Box onClick={() => setCommentClick(!commentClick)}>
            {/* {commentClick ? ( */}
            {/* <ModeCommentRoundedIcon /> */}
            {/* ) : ( */}
            <ModeCommentOutlinedIcon sx={{ fontSize: 18, cursor: "pointer" }} />
            {/* )} */}
          </Box>
          <Box>
            <ReplyRoundedIcon sx={{ fontSize: 18, cursor: "pointer" }} />
          </Box>
          <Box
            sx={{ fontSize: "12px" }}
            onClick={() => setLikeClick(!likeClick)}
          >
            {likeClick ? (
              <FavoriteRoundedIcon
                sx={{ color: "#35e664", fontSize: 18, cursor: "pointer" }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                sx={{ fontSize: 18, cursor: "pointer" }}
              />
            )}
          </Box>
          <Box onClick={()=>setBookmarkClick(!bookmarkClick)}>
            {bookmarkClick ? (
              <BookmarkOutlinedIcon
                sx={{ color: "yellow", fontSize: 18, cursor: "pointer" }}
              />
            ) : (
              <BookmarkBorderOutlinedIcon
                sx={{ fontSize: 18, cursor: "pointer" }}
              />
            )}
          </Box>

          {/* <ModeCommentRoundedIcon/> */}
          {/* <FavoriteRoundedIcon sx={{color: "blue"}}/> */}
        </CardActions>
      </Card>
    </Box>
  );
}
