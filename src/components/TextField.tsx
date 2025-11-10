import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function TextInput({
  name,
  control,
  label,
  type = "text",
  ...props
}: any) {
  const isFile = type === "file";
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          value={isFile ? undefined : field.value}
          onChange={(e) => {
            if (isFile) {
              const fileInput = e.target as HTMLInputElement;
              field.onChange(fileInput.files?.[0] || null);
            } else {
              field.onChange(e.target.value);
            }
          }}
          inputProps={isFile ? { accept: ".pdf,.doc,.docx" } : {}}
          fullWidth
          margin="normal"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          InputLabelProps={
            type === "date" || type === "file" ? { shrink: true } : {}
          }
          {...props}
        />
      )}
    />
  );
}
