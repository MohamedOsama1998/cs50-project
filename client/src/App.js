import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDarkmode } from "./redux/actions/themeAction";
import Cookies from "js-cookie";
import { fetchUserFromCookies } from "./redux/actions/userActions";
import jwt_decode from "jwt-decode";
import "./styles/App.css";

import Header from "./layout/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Land from "./pages/Land";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import { actions } from "./redux/actionConstants";

const App = () => {
  const dispatch = useDispatch();
  const isDarkmode = useSelector(({ theme }) => theme.isDarkmode);
  const isAuth = useSelector(({ auth }) => auth.isAuth);
  const snackbar = useSelector(({ snackbar }) => snackbar);
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  const lightTheme = createTheme({ palette: { mode: "light" } });

  const handleSnackbarClose = () => {
    dispatch({
      type: actions.SET_SNACKBAR_PROPERTIES,
      payload: { isOpen: false, text: "", severity: "" },
    });
  };

  useEffect(() => {
    dispatch(fetchDarkmode());
    if (Cookies.get("accessToken")) {
      dispatch(fetchUserFromCookies(jwt_decode(Cookies.get("accessToken"))));
    }
  }, [dispatch]);

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
              path="/profile"
              element={isAuth ? <Profile /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/tasks"
              element={isAuth ? <Tasks /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Snackbar
            open={snackbar.isOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbar.text}
            color="success"
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbar.severity || "success"}
              sx={{ width: "100%" }}
            >
              {snackbar.text}
            </Alert>
          </Snackbar>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
