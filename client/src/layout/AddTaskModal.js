import { Button, Modal, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddTaskModal } from "../redux/actions/tasksActions";
import AddTaskForm from "../forms/AddTaskForm";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddTaskModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(({ tasks }) => tasks.modal);
  return (
    <>
      <Button
        onClick={() => {
          dispatch(toggleAddTaskModal(modal));
        }}
        color="success"
        variant="outlined"
      >
        <AddIcon />
        Add task
      </Button>
      <Modal
        open={modal}
        onClose={() => {
          dispatch(toggleAddTaskModal(modal));
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add task:
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component={"div"}
          >
            <AddTaskForm />
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default AddTaskModal;
