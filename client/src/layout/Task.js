import Card from "@mui/material/Card";
import { CardContent, CardHeader, IconButton } from "@mui/material/";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Typography from "@mui/material/Typography";
import DeleteTaskDialog from "./DeleteTaskDialog";

const Task = ({ title, text, addedOn, taskID, status }) => {
  return (
    <Card style={{ marginTop: "15px", marginBottom: "15px" }}>
      <CardHeader
        title={title}
        action={
          <>
            <IconButton>
              <EditIcon />
            </IconButton>
            <DeleteTaskDialog taskID={taskID} />
            {status === "PENDING" ? (
              <IconButton>
                <PlayArrowIcon />
              </IconButton>
            ) : null}
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
