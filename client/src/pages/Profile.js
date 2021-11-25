import { Grid, Button, Paper } from "@mui/material";
import DisplayProfileInfo from "../layout/DisplayProfileInfo";
import EditProfileForm from "../forms/EditProfileForm";
import { useState } from "react";

const Profile = () => {
  const [isEditing, setEditing] = useState(false);
  return (
    <Grid
      container
      columns={{ xs: 6, md: 6, xl: 12 }}
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{
        marginTop: "20px",
      }}
    >
      <Grid item xs={5} md={3} xl={5}>
        <Paper elevation={0} className="form">
          {isEditing ? (
            <EditProfileForm>
              <Button
                onClick={() => {
                  setEditing(false);
                }}
                variant="outlined"
                size="large"
                style={{
                  marginTop: "20px",
                  marginRight: "15px",
                }}
              >
                Cancel
              </Button>
            </EditProfileForm>
          ) : (
            <DisplayProfileInfo>
              <Button
                onClick={() => {
                  setEditing(!isEditing);
                }}
                variant="outlined"
                size="large"
                style={{
                  marginTop: "20px",
                }}
              >
                Edit
              </Button>
            </DisplayProfileInfo>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
