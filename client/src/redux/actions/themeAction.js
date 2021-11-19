import { actions } from "../actionConstants";
import Cookies from "js-cookie";

export const fetchDarkmode = () => (dispatch) => {
  if (!Cookies.get("isDarkmode")) {
    Cookies.set("isDarkmode", "true");
  }

  const isDarkmode = Cookies.get("isDarkmode");
  dispatch({
    type: actions.FETCH_DARKMODE,
    isDarkmode: isDarkmode === "true",
  });
};

export const toggleDarkmode = () => (dispatch) => {
  const isDarkmode = Cookies.get("isDarkmode");
  Cookies.remove("isDarkmode");
  Cookies.set("isDarkmode", isDarkmode === "false");
  dispatch({
    type: actions.TOGGLE_DARKMODE,
    isDarkmode: isDarkmode === "false",
  });
};
