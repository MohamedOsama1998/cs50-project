import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";
import DarkModeContext from "./contexts/DarkModeContext";
import "./styles/App.css";

import Header from "./layout/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Land from "./pages/Land";
import NotFound from "./pages/NotFound";

const App = () => {
  const [darkMode, toggleDarkmode] = useState(true);
  const value = { darkMode, toggleDarkmode };
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  const lightTheme = createTheme({ palette: { mode: "light" } });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline>
        <BrowserRouter>
          <DarkModeContext.Provider value={value}>
            <Header />
          </DarkModeContext.Provider>
          <Routes>
            <Route path="/" element={<Land />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
