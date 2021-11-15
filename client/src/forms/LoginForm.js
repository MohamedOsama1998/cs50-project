import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";

const RegisterForm = () => {
  const [isLoading, toggleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <TextField
        autoComplete="new-password"
        margin="normal"
        variant="standard"
        label="Email"
        type="email"
        required
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        autoComplete="new-password"
        margin="normal"
        variant="standard"
        label="Password"
        type="password"
        required
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoadingButton
        type="submit"
        loading={isLoading}
        variant="outlined"
        size="large"
        style={{
          marginTop: "20px",
        }}
      >
        Login
      </LoadingButton>
    </form>
  );
};

export default RegisterForm;
