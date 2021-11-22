import { useState } from "react";
import { Grid, Typography, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmEditDialog from "../layout/ConfirmEditDialog";

const ProfileField = ({ text, label, type }) => {
  const [isEditing, setEditing] = useState(false);
  //   const [error, settError] = useState(false);
  const [value, setValue] = useState(text);

  return (
    <Grid item xs={5} md={5} xl={7}>
      <Typography variant="h5" gutterBottom component="div">
        {label} :{" "}
        {isEditing ? (
          <>
            <TextField
              size="large"
              variant="standard"
              value={value}
              placeholder={label}
              type={type}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <ConfirmEditDialog
              text={value}
              label={label}
              disabled={value === text}
            />
            <IconButton
              onClick={() => {
                setValue(text);
                setEditing(false);
              }}
            >
              <CloseIcon color="error" />
            </IconButton>
          </>
        ) : (
          <>
            {text}
            <IconButton
              onClick={() => {
                setEditing(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </Typography>
    </Grid>
  );
};

export default ProfileField;
