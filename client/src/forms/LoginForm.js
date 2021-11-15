import { useState } from "react";

import { TextField, Button } from "@mui/material";

const RegisterForm = () => {
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
      <Button type="submit" size="large">
        Login
      </Button>
    </form>
  );
};

export default RegisterForm;
