import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/actions/tasksActions";
import Task from "../layout/Task";
import AddTaskModal from "../layout/AddTaskModal";

const Tasks = () => {
  const tasks = useSelector(({ tasks }) => tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <>
      <AddTaskModal />
      <Grid
        columns={{ xs: 7, md: 13, xl: 14 }}
        container
        spacing={4}
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Grid item xs={3} md={4} xl={4}>
          <Typography variant="h5">Pending</Typography>
          {tasks.map((task) =>
            task.status === "0" ? <Task task={task} key={task.taskID} /> : null
          )}
        </Grid>
        <Grid item xs={3} md={4} xl={4}>
          <Typography variant="h5">In progress</Typography>
          {tasks.map((task) =>
            task.status === "1" ? <Task task={task} key={task.taskID} /> : null
          )}
        </Grid>
        <Grid item xs={6} md={4} xl={4}>
          <Typography variant="h5">Finished</Typography>
          {tasks.map((task) =>
            task.status === "2" ? <Task task={task} key={task.taskID} /> : null
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Tasks;
