import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useContext, useState } from "react";

const AppCotext = createContext();

export function useApp() {
    return useContext(AppCotext);
}

export default function AppProvider({ children }) {
  const [mode, setMode] = useState("dark");

  const theme = createTheme({
    palette: {
      mode
    },
  });
  return (
    <AppCotext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppCotext.Provider>
  );
}
