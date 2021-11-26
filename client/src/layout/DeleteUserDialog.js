import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useState } from "react";
import { useDispatch } from "react-redux";

const DeleteUserDialog = ({ taskID }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    console.log("woops");
  };
  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
      >
        <BackspaceIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Delete account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? <br />
            You will permanently lose access to this account and lose all your
            data.
          </DialogContentText>
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
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteUserDialog;
