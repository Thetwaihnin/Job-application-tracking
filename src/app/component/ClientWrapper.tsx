"use client";
import { Box } from "@mui/material";
import Navbar from "../component/Navbar";
import ProfilePic from "../component/ProfilePic";
import Sidebar from "../component/Sidebar";
import { useState } from "react";
import React from "react";
export type SidebarProps = {
  handleDrawer: () => void;
};

export type Drawers = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", position: "relative", maxHeight: "100vh", minHeight: "100vh", backgroundImage: "url('/hauntedHome.jpg')", backgroundSize: "cover", }}
      >
        <Navbar handleDrawer={handleDrawer} />

        <Box sx={{ display: "flex", flex: 1, height: "100%" }}>
          <Sidebar open={open} setOpen={setOpen} />
          <Box component="main" sx={{ flex: 1, p: 2 }}>
            {/* <ProfilePic /> */}
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ClientWrapper;
