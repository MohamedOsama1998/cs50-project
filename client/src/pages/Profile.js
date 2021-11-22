import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import ProfileField from "../layout/ProfileField";

const Profile = () => {
  const userInfo = useSelector(({ auth }) => auth);
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
      <ProfileField text={userInfo.username} label="Username" type="text" />
      <ProfileField text={userInfo.email} label="Email" type="email" />
      <ProfileField text="*******" label="Password" type="password" />
    </Grid>
  );
};

export default Profile;
