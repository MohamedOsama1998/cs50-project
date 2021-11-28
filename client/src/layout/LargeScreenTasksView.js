import { Grid, Typography } from "@mui/material";
import Task from "./Task";

const LargeScreenTasksView = ({ tasks }) => {
  return (
    <>
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
    </>
  );
};

export default LargeScreenTasksView;
