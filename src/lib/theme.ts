"use client";
import { createTheme } from "@mui/material/styles";
import { eater,nosifer,creepster,roboto } from "@/app/layout";
// import roboto from "@/app/layout";

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    // h1: { fontFamily: nosifer.style.fontFamily },
    // body2: { fontFamily: creepster.style.fontFamily },
    // body1: { fontFamily: eater.style.fontFamily },
  },
   palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#0f172a",   // like tailwind slate-900
      paper: "#1e293b",     // like tailwind slate-800
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
  },

  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: roboto.style.fontFamily, 
        },
      },
    },
  },
});

export default theme;
