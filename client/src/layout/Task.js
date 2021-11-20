import Card from "@mui/material/Card";
import { CardContent, CardHeader, IconButton, Divider } from "@mui/material/";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import DeleteTaskDialog from "./DeleteTaskDialog";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../redux/actions/tasksActions";
import moment from "moment";

const Task = ({ title, text, addedOn, modifiedOn, taskID, status }) => {
  const dispatch = useDispatch();
  const handleChange = (action) => {
    const changeValue = action === "advance" ? 1 : -1;
    dispatch(
      updateTaskStatus({
        taskID: taskID,
        status: parseInt(status) + changeValue,
      })
    );
  };
  return (
    <Card style={{ marginTop: "15px", marginBottom: "15px" }}>
      <CardHeader
        title={title}
        action={
          <>
            {status === "1" || status === "2" ? (
              <IconButton
                onClick={() => {
                  handleChange("reverse");
                }}
              >
                <ArrowBackOutlinedIcon />
              </IconButton>
            ) : null}
            <IconButton>
              <EditIcon />
            </IconButton>
            <DeleteTaskDialog taskID={taskID} />
            {status === "0" || status === "1" ? (
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
          {text}
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Added {moment(addedOn).fromNow()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last modified {moment(modifiedOn).fromNow()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
