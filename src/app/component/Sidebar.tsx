"use client";
import * as React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
  ListItemIcon,
} from "@mui/material";
import { Drawers } from "./ClientWrapper";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';

// interface SidebarProps {
//   open: boolean;
//   onClose: () => void;
// }
const drawerWidth = 240;
const miniDrawerWidth = 72;

export default function Sidebar({ open, setOpen }: Drawers) {
  const isSmallScreen = useMediaQuery("(max-width:600px)", { noSsr: true });
  const theme = useTheme();
  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "black",
          },
        }}
      >
        <Toolbar />
        <List >
          <ListItem
            component="button"
            sx={{
              color: "red",
              paddingLeft: 6,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.2)"
              },
            }}
          >
            <ListItemIcon sx={{ color: "red", fontSize: "12px" }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem component="button">
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Drawer>

      {!isSmallScreen && (
        <Drawer
          variant="permanent"
          sx={{
            width: miniDrawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: miniDrawerWidth,
              backgroundColor: "#2E073F",
              zIndex: 900,
              overflowX: "hidden",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              "&:hover": {
                width: drawerWidth,
              },
            },
          }}
        >
          <Toolbar />
          <List sx={{ marginX: 1, paddingY: 3 }}>
            <ListItem component="button" sx={{ marginBottom: 2 , cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.2)"
              } }}>
              <ListItemIcon sx={{ fontSize: "12px", fontWeight: "bold" , color: "#35e664",  }}>
                <AccountBoxIcon/>
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ color: "#35e664" }} />
            </ListItem>

            <ListItem component="button" sx={{ marginBottom: 2 , cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.2)"
              } }}>
              <ListItemIcon sx={{ fontSize: "12px", fontWeight: "bold" , color: "#35e664" }}>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "#35e664" }} />
            </ListItem>

            <ListItem component="button" sx={{ marginBottom: 2 , cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.2)"
              } }}>
              <ListItemIcon sx={{ fontSize: "12px", fontWeight: "bold" , color: "#35e664" }}>
                <SettingsIcon/>
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ color: "#35e664" }} />
            </ListItem>
            {/* <ListItem component="button">
              <ListItemText primary="Starred" />
            </ListItem> */}
          </List>
        </Drawer>
      )}
    </>
  );
}
