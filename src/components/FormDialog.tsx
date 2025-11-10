"use client";

import { Dialog, DialogContent, DialogTitle, Button, Box } from "@mui/material";
import { FormDialogType } from "@/types/form";

export default function FormDialog({
  open,
  title,
  children,
  handleOnClose,
}: FormDialogType) {
  return (
    <Dialog
      open={open}
      // onClose={() => setOpen(false)}
      title={title}
      fullWidth
      PaperProps={{
        sx: {
          p: 4,
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
      <Box sx={{ display: "flex" }} onClick={handleOnClose}>
        <DialogTitle sx={{ fontSize: 24 }}>{title}</DialogTitle>
        <Button sx={{ fontSize: 24, fontWeight: "bold", float: "inline-end" }}>
          X
        </Button>
      </Box>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
        }}
      >
        {/* <TextField label="Task Name" fullWidth />
          <TextField label="Description" multiline rows={3} fullWidth /> */}
        {children}
      </DialogContent>
    </Dialog>
  );
}
