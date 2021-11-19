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
import { deleteTask } from "../redux/actions/tasksActions";

const DeleteTaskDialog = ({ taskID }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(taskID));
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
        <DialogTitle>Delete task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? <br />
            This process cannot be undone!
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

export default DeleteTaskDialog;
