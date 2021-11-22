import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

const DeleteTaskDialog = ({ label, text, disabled }) => {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!password) {
      setError("Please enter your password");
    } else {
      console.log(`Changing ${label.toLowerCase()} to ${text}`);
    }
  };

  return (
    <>
      <IconButton
        disabled={disabled}
        onClick={() => {
          setOpen(true);
        }}
      >
        <CheckIcon color="success" />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Confirm changes</DialogTitle>
        {error ? (
          <DialogContent>
            <Alert
              severity="error"
              onClose={() => {
                setError("");
              }}
            >
              {error}
            </Alert>
          </DialogContent>
        ) : null}
        <DialogContent>
          <DialogContentText>
            Please enter your current password below to confirm changes
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <TextField
            error={error !== ""}
            variant="standard"
            type="password"
            fullWidth
            name="password"
            label="Current password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            autoFocus
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="success">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTaskDialog;
