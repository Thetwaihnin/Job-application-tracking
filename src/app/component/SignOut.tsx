'use client'

import React from "react";
import { Box, Button,Typography } from "@mui/material";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <Box sx={{ display: {xs: "none", sm: "block"}}}>
      <Button variant="outlined" sx={{ backgroundColor: "#35e664", "&:hover": { backgroundColor: "red" , color: "white" } }} onClick={() => signOut({ callbackUrl: "/login", redirect: true })}>
        <Typography variant="body1">Logout</Typography>
      </Button>
    </Box>
  );
}
