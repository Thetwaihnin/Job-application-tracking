'use client'

import { Box, IconButton } from '@mui/material'
import React from 'react'
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useRouter } from 'next/navigation';

export default function Button() {
    const router = useRouter();
  return (
    <Box sx={{ cursor: "pointer", width: "fit-content", textAlign: "start" }} onClick={() => router.push("/dashboard")}>
        <IconButton>
          <ArrowBackSharpIcon />
        </IconButton>
      </Box>
  )
}
