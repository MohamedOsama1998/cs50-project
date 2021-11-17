import { actions } from "../actionConstants";

const initState = {
  isDarkmode: true,
};

export const themeReducer = (state = initState, { type, payload }) => {
  if (type === actions.TOGGLE_DARKMODE) {
    return {
      isDarkmode: !payload,
    };
  } else {
    return state;
  }
};
