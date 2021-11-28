import { Typography } from "@mui/material";

const ServerError = () => {
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
        500 Internal server error
      </Typography>
      <Typography variant="body1" gutterBottom>
        Looks like there's something wrong in the back-end server. <br /> Please
        come back later, we're pretty sure our developer is working on it at the
        moment. :)
      </Typography>
    </div>
  );
};

export default ServerError;
