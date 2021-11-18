import { Button, Grid, Modal, Box, Typography } from "@mui/material";
import Task from "../layout/Task";
import { useState } from "react";
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

const Tasks = () => {
  const [isModal, setModal] = useState(false);
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
        open={isModal}
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
            <AddTaskForm />
          </Typography>
        </Box>
      </Modal>
      <Grid
        columns={{ xs: 7, md: 13, xl: 14 }}
        container
        spacing={4}
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Grid item xs={3} md={4} xl={4}>
          <Typography variant="h4">Pending tasks</Typography>
          <Task />
          <Task />
        </Grid>
        <Grid item xs={3} md={4} xl={4}>
          <Typography variant="h4">In progress</Typography>
          <Task />
          <Task />
          <Task />
        </Grid>
        <Grid item xs={6} md={4} xl={4}>
          <Typography variant="h4">Finished</Typography>
          <Task />
        </Grid>
      </Grid>
    </>
  );
};

export default Tasks;
