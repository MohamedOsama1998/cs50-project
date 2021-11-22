import {
  IconButton,
  Avatar,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Stack,
  Divider,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { logOutUser } from "../redux/actions/userActions";
import LogoutIcon from "@mui/icons-material/Logout";
import { toggleDarkmode } from "../redux/actions/themeAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InvertColorsIcon from "@mui/icons-material/InvertColors";

const SignedInLinks = () => {
  const isDarkmode = useSelector(({ theme }) => theme.isDarkmode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    Cookies.remove("accessToken");
    dispatch(logOutUser());
    navigate("/", { replace: true });
  };

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={(e) => {
                        navigate("/profile", { replace: true });
                        handleClose(e);
                      }}
                    >
                      <AccountCircleIcon />
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(toggleDarkmode(isDarkmode));
                      }}
                    >
                      <InvertColorsIcon />
                      Dark theme: {isDarkmode ? "On" : "Off"}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleSignOut}>
                      <LogoutIcon />
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
};

export default SignedInLinks;
