import { actions } from "../actionConstants";

const initState = {};

export const themeReducer = (state = initState, { type, isDarkmode }) => {
  switch (type) {
    case actions.FETCH_DARKMODE:
      return {
        isDarkmode: isDarkmode,
      };
    case actions.TOGGLE_DARKMODE:
      return {
        isDarkmode: isDarkmode,
      };
    default:
      return state;
  }
};
