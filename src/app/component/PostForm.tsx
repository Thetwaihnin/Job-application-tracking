
"use client";

import { Controller, Control } from "react-hook-form";
import { TextField, Button, Stack, Box } from "@mui/material";
import { useState } from "react";

export type PostFormInputs = {
  title: string;
  content: string;
  authorId: number | string;
  images: File[];
};

export type PostFormProps = {
  control: Control<PostFormInputs>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string | any;
};
const maxWords = 50;

export default function PostForm({ control, onSubmit, error  }: PostFormProps) {
  const [preview, setPreview] = useState<string[]>([]);

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <Box>
              <label className="flex items-center cursor-pointer gap-2 border border-dashed p-3 rounded">
                <span>➕</span> Upload Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files) return;
                    const fileArray = Array.from(files);
                    field.onChange(fileArray);
                    const previews = fileArray.map((file) =>
                      URL.createObjectURL(file)
                    );
                    setPreview(previews);
                  }}
                  hidden
                />
              </label>

              {preview.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {preview.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Preview ${idx}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </Box>
          )}
        />

        {/* <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field, fieldState }) => (
            <TextField {...field} label="Title" required fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )}
        /> */}

        <Controller
          name="content"
          control={control}
          rules={{
            required: "Content is required",
            validate: (value) => {
              const wordCount = value
                .trim()
                .split(/\s+/)
                .filter(Boolean).length;
              return wordCount <= maxWords || `Max ${maxWords} words allowed`;
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Content"
              multiline
              rows={4}
              fullWidth
              helperText={
                error.content
                  ? error.content.message
                  : `${
                      field.value.trim().split(/\s+/).filter(Boolean).length
                    }/${maxWords} words`
              }
              error={!!fieldState.error}
            />
          )}
        />

        <Button type="submit" variant="contained">
          Post
        </Button>
      </Stack>
    </form>
  );
}
