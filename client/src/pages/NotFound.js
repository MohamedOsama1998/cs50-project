import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="h1" component="div" gutterBottom color="error">
        Oops!
      </Typography>
      <Typography variant="h2" component="div" gutterBottom>
        404 Page not found.
      </Typography>
      <Button
        variant="outlined"
        size="large"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        Take me home
      </Button>
    </div>
  );
};

export default NotFound;
