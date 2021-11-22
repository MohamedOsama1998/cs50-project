import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toggleDarkmode } from "../redux/actions/themeAction";

const SignedOutLinks = () => {
  const isDarkmode = useSelector(({ theme }) => theme.isDarkmode);
  const themeDispatch = useDispatch();
  return (
    <>
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
    </>
  );
};

export default SignedOutLinks;
