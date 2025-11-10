'use client'

import { AppBar, Box, Button, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import SignOut from "./SignOut";
import MenuIcon from "@mui/icons-material/Menu";
import  { SidebarProps } from "./ClientWrapper";

export default  function Navbar({handleDrawer}: SidebarProps) {
  // const isSmallScreen = useMediaQuery('(min-width:600px)', { noSsr: true });

  // const session = await getServerSession(authOptions);

  // const [open, setOpen] = React.useState(false);  

  return (
    <Box
      component="nav"
      sx={{
        position: "sticky",
        top: 0,
        boxShadow: 6,
        padding: 2,
        // backgroundColor: "#7A1CAC",
        // backgroundColor: "#2CB4A9",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // marginX: "auto",
          flexDirection: { xs: "row", sm: "row" },
        }}
      >
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawer}
            sx={{ mr: 2 , display: {sm: "none", xs: "flex"} }}
          >
            <MenuIcon />
          </IconButton>
        
        <Link href="/dashboard">
          <Box
            component="h1"
            sx={{
              color: "inherit",
              cursor: "pointer",
              "&:hover": { color: "blue" },
              textDecoration: "none",
              fontSize: "2rem",
            }}
          >
            <Typography sx={{fontFamily: "eater", color: "#35e664", border: "2px solid #35e664", paddingX: 1, borderRadius: 2}}>
              wei
            </Typography>
          </Box>
        </Link>
        <Box
          sx={{
            display:{ sm: "flex", xs: "none"},
            flexDirection: "row",
            justifyContent: { xs: "center", sm: "space-evenly" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography sx={{ fontFamily: "eater", color: "#35e664", fontSize: "1.5rem"}}>Happy Halloween</Typography>
          {/* <Link href="https://www.youtube.com">
            <YouTubeIcon
              sx={{
                color: "red",
                width: 30,
                height: 30,
                "&:hover": { color: "blue" },
              }}
            />
          </Link>
          <Link href="https://github.com">
            <GitHubIcon
              sx={{
                color: "black",
                width: 30,
                height: 30,
                "&:hover": { color: "blue" },
              }}
            />
          </Link>
          <Link href="https://twitter.com">
            <TwitterIcon
              sx={{
                color: "blue",
                width: 30,
                height: 30,
                "&:hover": { color: "blue" },
              }}
            />
          </Link>
          <Link href="https://www.instagram.com">
            <InstagramIcon
              sx={{
                color: "red",
                width: 30,
                height: 30,
                "&:hover": { color: "blue" },
              }}
            />
          </Link> */}
        </Box>

        {/* {session?.user ? <SignOut /> : <div></div>} */}
        <SignOut/>
      </Box>
    </Box>
  );
}
