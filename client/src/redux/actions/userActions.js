import { actions } from "../actionConstants";

export const authUser = (payload) => {
  return {
    type: actions.AUTH_USER,
    payload: payload,
  };
};

export const logOutUser = () => {
  return {
    type: actions.LOGOUT_USER,
  };
};
