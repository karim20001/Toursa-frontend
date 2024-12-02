import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AuthProvider from "./context/AuthContext"; // Correctly import AuthProvider
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
    <App />
  </AuthProvider>,
  </ThemeProvider>,
  document.getElementById("root")
);
