import { actions } from "../actionConstants";
import Cookies from "js-cookie";

if (!Cookies.get("isDarkmode")) {
  Cookies.set("isDarkmode", "false");
}

const initState = {
  isDarkmode: Cookies.get("isDarkmode") === "true",
};

export const themeReducer = (state = initState, { type }) => {
  if (type === actions.TOGGLE_DARKMODE) {
    let currentTheme = Cookies.get("isDarkmode") === "true";
    Cookies.remove("isDarkmode");
    Cookies.set("isDarkmode", !currentTheme);
    return {
      isDarkmode: !currentTheme,
    };
  } else {
    return state;
  }
};
