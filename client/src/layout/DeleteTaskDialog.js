import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/actions/tasksActions";
import { setSnackbar } from "../redux/actions/snackBarActions";

const DeleteTaskDialog = ({ taskID }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    setLoading(true);
    dispatch(deleteTask(taskID))
      .then(() => {
        dispatch(
          setSnackbar({
            isOpen: true,
            text: "The task you've chosen has been deleted.",
            severity: "warning",
          })
        );
      })

      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
          <LoadingButton onClick={handleDelete} color="error" loading={loading}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTaskDialog;
