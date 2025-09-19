"use client";
import { createTheme } from "@mui/material/styles";
import { eater,nosifer,creepster,roboto } from "@/app/layout";
// import roboto from "@/app/layout";

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: { fontFamily: nosifer.style.fontFamily },
    body2: { fontFamily: creepster.style.fontFamily },
    body1: { fontFamily: eater.style.fontFamily },
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
