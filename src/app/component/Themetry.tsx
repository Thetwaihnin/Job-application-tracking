// "use client";

// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import theme from "../../lib/theme";
// import { Roboto } from "next/font/google";

// export const roboto = Roboto({
//   weight: "400",
//   subsets: ["latin"],
// });

// export default function Themetry({ children }: { children: React.ReactNode }) {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <div className={roboto.className}>{children}</div>
//     </ThemeProvider>
//   );
// }
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme } from "@/theme/lightTheme";
import { darkTheme } from "@/theme/darkTheme";

const ThemeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setMode(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);

    // Tailwind dark utility support
    document.documentElement.classList.toggle("dark", newMode === "dark");
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
