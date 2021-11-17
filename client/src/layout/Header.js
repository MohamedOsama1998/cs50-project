import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";
import { toggleDarkmode } from "../redux/actions/themeAction";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);
  const themeDispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SOLO
          </Typography>
          <Button color="inherit">
            <Link to="/register" className="link">
              Register
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/login" className="link">
              Login
            </Link>
          </Button>
          <IconButton
            color="inherit"
            onClick={() => {
              themeDispatch(toggleDarkmode(isDarkmode));
            }}
          >
            {isDarkmode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
