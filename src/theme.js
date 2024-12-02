import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Green
    },
    secondary: {
      main: "#ffffff", // White
    },
    background: {
      default: "#f9f9f9", // Light background
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
