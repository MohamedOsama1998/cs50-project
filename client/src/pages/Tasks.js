import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/actions/tasksActions";
import Task from "../layout/Task";
import AddTaskModal from "../layout/AddTaskModal";

const Tasks = () => {
  const tasks = useSelector(({ tasks }) => tasks.tasks);
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
          <Typography variant="h4">Pending tasks</Typography>
          {tasks.map((task) =>
            task.status === "PENDING" ? (
              <Task
                title={task.title}
                text={task.text}
                status={task.status}
                addedOn={tasks.addedOn}
                taskID={task.taskID}
                key={task.taskID}
              />
            ) : null
          )}
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
