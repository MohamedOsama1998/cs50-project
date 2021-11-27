import { actions } from "../actionConstants";

const initState = { text: "", isOpen: false, severity: "" };

export const snackBarReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.SET_SNACKBAR_PROPERTIES:
      return payload;
    default:
      return state;
  }
};
