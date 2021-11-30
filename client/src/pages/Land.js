import { Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router";

const Land = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        margin: "0",
        top: "50%s",
        position: "absolute",
        marginTop: "15vh",
      }}
    >
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={11} sm={10} md={10} lg={9} xl={8}>
          <Typography variant="h4" gutterBottom>
            Welcome to STM!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Solo Task Manager (STM) allows individuals to organize their
            projects easily without the need of all the unnecessary features
            that they don't need in a group-baesd project.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            To get started you will need to create an account.
          </Typography>
          <Button
            size="large"
            color="inherit"
            variant="outlined"
            style={{
              marginTop: "50px",
            }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Get started now!
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Land;
