import {
  AppBar,
  Toolbar,
  Container,
  Badge,
  Button,
  Typography,
  IconButton,
} from "@mui/material";

import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";

import { useApp } from "./AppProvider";

export default function Header({ count, clear }) {
  const { mode, setMode } = useApp();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Container
            maxWidth="sm"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography sx={{ flexGrow: 1 }}>
              <Badge badgeContent={count} color="error">
                Todo
              </Badge>
            </Typography>
            <Button variant="contained" color="light" onClick={clear}>
              Clear
            </Button>
            {mode === "dark" ? (
              <IconButton color="inherit" onClick={() => setMode("light")}>
                <LightModeIcon />
              </IconButton>
            ) : (
              <IconButton color="inherit" onClick={() => setMode("dark")}>
                <DarkModeIcon />
              </IconButton>
            )}
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}
