import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SignedOutLinks = () => {
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
    </>
  );
};

export default SignedOutLinks;
