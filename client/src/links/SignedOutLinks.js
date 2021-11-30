import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toggleDarkmode } from "../redux/actions/themeAction";
import { useNavigate } from "react-router";

const SignedOutLinks = () => {
  const navigate = useNavigate();
  const isDarkmode = useSelector(({ theme }) => theme.isDarkmode);
  const themeDispatch = useDispatch();
  return (
    <>
      <Button
        color="inherit"
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </Button>
      <Button
        color="inherit"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
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
