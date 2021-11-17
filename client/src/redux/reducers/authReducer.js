import { actions } from "../actionConstants";

const initState = {
  username: "",
  email: "",
  userID: null,
  accessToken: "",
};

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.AUTH_USER:
      return {
        username: payload.username,
        email: payload.email,
        userID: payload.userID,
        accessToken: payload.accessToken,
      };
    default:
      return state;
  }
};
