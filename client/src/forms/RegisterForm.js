import { useState } from "react";
import { Link } from "react-router-dom";

import { TextField, Button } from "@mui/material";

const RegisterForm = () => {
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
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
