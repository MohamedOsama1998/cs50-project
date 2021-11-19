import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Task = ({ title, text }) => {
  return (
    <Card style={{ marginTop: "15px", marginBottom: "15px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Progress</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Task;
