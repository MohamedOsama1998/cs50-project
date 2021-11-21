import { Button, Modal, Box, Typography } from "@mui/material";
import AddTaskForm from "../forms/AddTaskForm";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

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
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setModal(true);
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
          setModal(false);
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
            <AddTaskForm>
              <Button
                onClick={() => {
                  setModal(false);
                }}
                variant="outlined"
                size="large"
              >
                Cancel
              </Button>
            </AddTaskForm>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default AddTaskModal;
