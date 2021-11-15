import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
