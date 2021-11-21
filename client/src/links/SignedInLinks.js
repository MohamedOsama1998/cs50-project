import { Menu, MenuItem, Avatar, IconButton, Divider } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/actions/userActions";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SignedOutLinks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    Cookies.remove("accessToken");
    dispatch(logOutUser());
    navigate("/", { replace: true });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
            setAnchorEl(null);
          }}
        >
          <AccountCircleIcon />
          Profile
        </MenuItem>
        <Divider variant="middle" />
        <MenuItem onClick={handleSignOut}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default SignedOutLinks;
