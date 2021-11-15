import { Grid, Paper } from "@mui/material";
import RegisterForm from "../forms/RegisterForm";

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
      <Grid item xs={5} md={4} xl={5}>
        <Paper elevation={2} className="form">
          <RegisterForm />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
