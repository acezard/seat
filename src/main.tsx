import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import App from "./App.tsx"

const theme = createTheme({
  palette: {
    primary: {
      main: "#305c49",
    },
    secondary: {
      main: "#b56e2f",
    },
    background: {
      default: "#efe7db",
      paper: "#fffbf6",
    },
    text: {
      primary: "#1e2421",
      secondary: "#5a635d",
    },
    divider: "rgba(90, 84, 72, 0.14)",
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
    h2: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: "outlined",
      },
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            minWidth: 320,
          },
          "#root": {
            minHeight: "100vh",
          },
        }}
      />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
