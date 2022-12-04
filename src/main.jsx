import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, pink } from "@mui/material/colors";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "./assets/blockchain/WagmiClient";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: pink[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <App />
      </WagmiConfig>
    </ThemeProvider>
  </React.StrictMode>
);
