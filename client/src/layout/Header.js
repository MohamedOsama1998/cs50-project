import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import SignedOutLinks from "../links/SignedOutLinks";
import SignedInLinks from "../links/SignedInLinks";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
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
            onClick={() => {
              navigate("/");
            }}
          >
            STM
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {isAuth ? <SignedInLinks /> : <SignedOutLinks />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
