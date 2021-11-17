import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import "./styles/App.css";

import Header from "./layout/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Land from "./pages/Land";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";

const App = () => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  const lightTheme = createTheme({ palette: { mode: "light" } });

  return (
    <ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
      <CssBaseline>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Navigate to="/tasks" replace /> : <Land />}
            />
            <Route
              path="/login"
              element={isAuth ? <Navigate to="/tasks" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={isAuth ? <Navigate to="/tasks" replace /> : <Register />}
            />
            <Route
              path="/tasks"
              element={isAuth ? <Tasks /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
