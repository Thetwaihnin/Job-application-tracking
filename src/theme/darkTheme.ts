import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f172a", // slate-900
      paper: "#1e293b",   // slate-800
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
  },
});
