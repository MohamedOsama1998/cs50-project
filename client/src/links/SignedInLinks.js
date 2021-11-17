import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/actions/userActions";

const SignedOutLinks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    Cookies.remove("accessToken");
    dispatch(logOutUser());
    navigate("/", { replace: true });
  };

  return (
    <>
      <Button color="inherit" onClick={handleSignOut}>
        Sign out
      </Button>
    </>
  );
};

export default SignedOutLinks;
