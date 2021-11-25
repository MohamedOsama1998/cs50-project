import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const ProfileField = ({ children }) => {
  const userInfo = useSelector(({ auth }) => auth);

  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: "25px" }}>
        Username: {userInfo.username}
      </Typography>
      <Typography variant="h5">Email address: {userInfo.email}</Typography>
      {children}
    </div>
  );
};

export default ProfileField;
