import { actions } from "../actionConstants";

export const authUser = (payload) => {
  return {
    type: actions.AUTH_USER,
    payload: payload,
  };
};
