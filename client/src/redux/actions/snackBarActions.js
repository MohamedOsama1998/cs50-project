import { actions } from "../actionConstants";

export const setSnackbar = (properties) => {
  return {
    type: actions.SET_SNACKBAR_PROPERTIES,
    payload: properties,
  };
};
