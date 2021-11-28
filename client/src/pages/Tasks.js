import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchTasks } from "../redux/actions/tasksActions";
import AddTaskModal from "../layout/AddTaskModal";
import LargeScreenTasksView from "../layout/LargeScreenTasksView";
import SmallScreenTasksView from "../layout/SmallScreenTasksView";
import { useMediaQuery } from "@mui/material";

const Tasks = () => {
  const matches = useMediaQuery("(min-width:900px)");
  const navigate = useNavigate();
  const tasks = useSelector(({ tasks }) => tasks);
  const userInfo = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks()).catch((err) => {
      if (err.response.status === 500) {
        navigate("/error", { replace: true });
      }
    });
  }, [dispatch, navigate]);
  return (
    <>
      <Grid
        columns={{ xs: 7, md: 13, xl: 14 }}
        container
        spacing={4}
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        style={{
          marginTop: "20px",
        }}
      >
        <Grid item xs={6} md={12} xl={12}>
          <Typography variant="h4">
            Welcome back, {userInfo.username}!
          </Typography>
        </Grid>
        <Grid item xs={6} md={12} xl={12}>
          <Typography variant="h6">
            <AddTaskModal />
          </Typography>
        </Grid>
        {matches ? (
          <LargeScreenTasksView tasks={tasks} />
        ) : (
          <SmallScreenTasksView tasks={tasks} />
        )}
      </Grid>
    </>
  );
};

export default Tasks;
