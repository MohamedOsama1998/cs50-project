import { Grid, Button, Paper } from "@mui/material";
import DisplayProfileInfo from "../layout/DisplayProfileInfo";
import EditProfileForm from "../forms/EditProfileForm";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import { useDispatch } from "react-redux";
import { setAuthError } from "../redux/actions/userActions";
import { useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const [isEditingPassword, setEditingPassword] = useState(false);
  const [isInfoEditing, setInfoEditing] = useState(false);
  const [isDeleteAccount, setDeleteAccount] = useState(false);

  const renderComponent = () => {
    if (isEditingPassword) {
      return (
        <ChangePasswordForm>
          <Button
            onClick={() => {
              dispatch(setAuthError(""));
              setEditingPassword(false);
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
        </ChangePasswordForm>
      );
    } else if (isInfoEditing) {
      return (
        <EditProfileForm>
          <Button
            onClick={() => {
              dispatch(setAuthError(""));
              setInfoEditing(false);
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
      );
    } else if (isDeleteAccount) {
    } else {
      return (
        <DisplayProfileInfo>
          <Button
            onClick={() => {
              setInfoEditing(true);
            }}
            variant="outlined"
            size="large"
            style={{
              marginTop: "20px",
              marginRight: "15px",
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setEditingPassword(true);
            }}
            variant="outlined"
            size="large"
            style={{
              marginTop: "20px",
              marginRight: "15px",
            }}
          >
            Change password
          </Button>
          <Button
            onClick={() => {
              setDeleteAccount(true);
            }}
            variant="outlined"
            color="error"
            size="large"
            style={{
              marginTop: "20px",
            }}
          >
            Delete account
          </Button>
        </DisplayProfileInfo>
      );
    }
  };
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
          {renderComponent()}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
