import { actions } from "../actionConstants";

export const toggleDarkmode = (isDarkmode) => {
  return {
    type: actions.TOGGLE_DARKMODE,
    payload: isDarkmode,
  };
};
