"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

export default function FormDialog({
  open,
  title,
  children,
  handleOnClose,
}: any) {
  return (
    <Dialog
      open={open}
      fullWidth
      PaperProps={{
        sx: {
          p: 0,
          maxWidth: "500px",
          height: "100vh",
          maxHeight: "100vh",
          position: "fixed",
          right: 0,
          m: 0,
          borderRadius: 0,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          pt: 3,
        }}
      >
        <DialogTitle sx={{ fontSize: 24, p: 0 }}>{title}</DialogTitle>

        <Button
          type="button"
          onClick={handleOnClose}
          sx={{ fontSize: 24, fontWeight: "bold" }}
        >
          X
        </Button>
      </Box>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
          pb: 3,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
