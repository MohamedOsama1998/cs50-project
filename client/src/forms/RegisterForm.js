import { useState } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const RegisterForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  return (
    <form>
      <TextField
        autoComplete="new-password"
        margin="normal"
        variant="standard"
        label="Username"
        type="text"
        required
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></TextField>
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
      ></TextField>
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
      ></TextField>
      <TextField
        autoComplete="new-password"
        margin="normal"
        variant="standard"
        label="Confirm password"
        type="password"
        required
        fullWidth
        value={confPassword}
        onChange={(e) => setConfPassword(e.target.value)}
      ></TextField>
      <LoadingButton
        type="submit"
        loading={isLoading}
        variant="outlined"
        size="large"
        style={{
          marginTop: "20px",
        }}
      >
        Register
      </LoadingButton>
    </form>
  );
};

export default RegisterForm;
