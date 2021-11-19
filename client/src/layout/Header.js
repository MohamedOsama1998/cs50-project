import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toggleDarkmode } from "../redux/actions/themeAction";
import { useDispatch, useSelector } from "react-redux";
import SignedOutLinks from "../links/SignedOutLinks";
import SignedInLinks from "../links/SignedInLinks";

const Header = () => {
  const isDarkmode = useSelector(({ theme }) => theme.isDarkmode);
  const isAuth = useSelector((state) => state.auth.isAuth);
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
          >
            <Link to="/" className="link">
              SOLO
            </Link>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {isAuth ? <SignedInLinks /> : <SignedOutLinks />}
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
