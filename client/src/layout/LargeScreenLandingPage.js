import { Typography, Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router";

const LargeScreenLandingPage = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      columns={{ lg: 12, xl: 12 }}
      spacing={2}
      direction="row"
      justifyContent="center"
      style={{ textAlign: "center" }}
    >
      <Grid item lg={4} xl={5}>
        <Typography variant="h3" gutterBottom>
          Stand Alone Work
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          This app allows individuals to organize their projects easily without
          the need of all the unnecessary features that they don't need in a
          group-baesd project.
        </Typography>
      </Grid>
      <Grid item lg={4} xl={5}>
        <Typography variant="h3" gutterBottom>
          Get started now!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          To get started you will need to create an account.
          <br />
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <IconButton
            size="small"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </IconButton>
          now.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          or if you already have an account you can
          <IconButton
            size="small"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </IconButton>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LargeScreenLandingPage;
