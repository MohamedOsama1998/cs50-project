import { actions } from "../actionConstants";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const initState = Cookies.get("accessToken")
  ? {
      ...jwt_decode(Cookies.get("accessToken")),
      isAuth: true,
    }
  : {
      username: "",
      email: "",
      userID: null,
      isAuth: false,
    };

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.AUTH_USER:
      return {
        username: payload.username,
        email: payload.email,
        userID: payload.userID,
        isAuth: true,
      };
    case actions.LOGOUT_USER:
      return {
        username: "",
        email: "",
        userID: null,
        isAuth: false,
      };
    default:
      return state;
  }
};
