"use client";

import Post from "@/app/component/Post";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PostForm, { PostFormInputs } from "@/app/component/PostForm";
import useSWR from "swr";
import AddIcon from "@mui/icons-material/Add";

export default function Page() {
  const isAdmin = true;
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const session = useSession();
  const { mutate } = useSWR("/api/posts");

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<PostFormInputs>({
    defaultValues: {
      title: "",
      content: "",
      authorId: session.data?.user?.id || "",
      images: [],
    },
  });

  useEffect(() => {
    if (session.data?.user?.id) {
      setValue("authorId", session.data.user.id);
    }
  }, [session.data?.user?.id, setValue]);

  const onSubmit: SubmitHandler<PostFormInputs> = async (data) => {
    try {
      if (!session?.data?.user?.id) return;

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      data.images.forEach((file) => formData.append("images", file));

      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to create post");

      reset();
      setOpen(false);
      setMessage("Post created successfully");
      setSnackbarOpen(true);
      mutate("/api/posts");
    } catch (error) {
      console.error(error);
      setMessage("Failed to create post");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        paddingX: 3,
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "0",
      }}
      component="section"
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SnackbarContent
          message={message}
          sx={{
            backgroundColor: message.includes("Failed") ? "red" : "green",
            color: "white",
          }}
        />
      </Snackbar>

      {isAdmin && (
        <>
          <Box
            sx={{
              display: "flex",
              float: "inline-end",
              mb: 2,
              borderRadius: 50,
              backgroundColor: "#F2BB13",
              width: "fit-content",
              cursor: "pointer",
              position: "fixed",
              top: 90,
              left: "90%",
            }}
          >
            <IconButton onClick={() => setOpen(true)}>
              <AddIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>

          <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <DialogTitle>Create a New Post 🎃</DialogTitle>
            <DialogContent>
              <PostForm control={control} onSubmit={handleSubmit(onSubmit)} error={errors} />
            </DialogContent>
          </Dialog>
        </>
      )}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto", // 👈 only posts scroll
          pr: 1, // optional: avoid scrollbar overla
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE & Edge
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        }}
      >
        <Post />
      </Box>
    </Box>
  );
}
