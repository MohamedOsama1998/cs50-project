import {
  CardContent,
  CardHeader,
  IconButton,
  Divider,
  Card,
  Button,
} from "@mui/material/";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import DeleteTaskDialog from "./DeleteTaskDialog";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../redux/actions/tasksActions";
import { useNavigate } from "react-router";
import { setSnackbar } from "../redux/actions/snackBarActions";
import moment from "moment";
import { useState } from "react";
import EditTaskForm from "../forms/EditTaskForm";

const Task = ({ task }) => {
  const navigate = useNavigate();
  const [isEditing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (action) => {
    let changeValue;
    switch (action) {
      case "advance":
        changeValue = 1;
        task.status === "0"
          ? dispatch(
              setSnackbar({
                isOpen: true,
                text: "This task is now in progress, Good luck!",
                severity: "info",
              })
            )
          : dispatch(
              setSnackbar({
                isOpen: true,
                text: "You have completed this task! Good job!",
                severity: "success",
              })
            );
        break;
      case "reverse":
        changeValue = -1;
        task.status === "1"
          ? dispatch(
              setSnackbar({
                isOpen: true,
                text: "This task is now pending.",
                severity: "info",
              })
            )
          : dispatch(
              setSnackbar({
                isOpen: true,
                text: "Your task has been set to be in progress again!",
                severity: "info",
              })
            );
        break;
      default:
        break;
    }
    dispatch(
      updateTaskStatus({
        taskID: task.taskID,
        status: parseInt(task.status) + changeValue,
      })
    ).catch((err) => {
      if (err.response.status === 500) {
        navigate("/error", { replace: true });
      } else {
        console.log(err);
      }
    });
  };
  return (
    <Card style={{ marginTop: "15px", marginBottom: "15px", padding: "10px" }}>
      {isEditing ? (
        <EditTaskForm task={task}>
          <Button
            onClick={() => {
              setEditing(false);
            }}
            variant="outlined"
            size="large"
            color="error"
          >
            Cancel
          </Button>
        </EditTaskForm>
      ) : (
        <>
          <CardHeader
            title={task.title}
            action={
              <>
                {task.status === "1" || task.status === "2" ? (
                  <IconButton
                    onClick={() => {
                      handleChange("reverse");
                    }}
                  >
                    <ArrowBackOutlinedIcon />
                  </IconButton>
                ) : null}
                <IconButton
                  onClick={() => {
                    setEditing(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <DeleteTaskDialog taskID={task.taskID} />
                {task.status === "0" || task.status === "1" ? (
                  <IconButton
                    onClick={() => {
                      handleChange("advance");
                    }}
                  >
                    <ArrowForwardOutlinedIcon />
                  </IconButton>
                ) : null}
              </>
            }
          />
          <Divider variant="middle" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {task.text}
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardContent>
            <Typography variant="caption" display="block" gutterBottom>
              Added {moment(task.addedOn).fromNow()}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Last modified {moment(task.modifiedOn).fromNow()}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default Task;
