import { Grid, Paper } from "@mui/material";
import LoginForm from "../forms/LoginForm";

const Register = () => {
  return (
    <Grid
      columns={{ xs: 6, md: 6, xl: 12 }}
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={5} md={3} xl={5}>
        <Paper elevation={1} className="form">
          <LoginForm />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
