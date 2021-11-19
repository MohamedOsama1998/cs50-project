import { actions } from "../actionConstants";
import Axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const fetchUserFromCookies = () => (dispatch) => {
  if (Cookies.get("accessToken")) {
    const userData = jwt_decode(Cookies.get("accessToken"));
    dispatch({
      type: actions.FETCH_USER_FROM_COOKIES,
      payload: userData,
    });
  }
};

export const registerUser = (payload) => (dispatch) => {
  Axios({
    method: "POST",
    url: "/register",
    data: payload,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => {
      dispatch({
        type: actions.AUTH_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.SET_AUTH_ERROR,
        payload: err.response.data.message,
      });
    });
};

export const loginUser = (payload) => (dispatch) => {
  Axios({
    method: "POST",
    url: "/login",
    data: payload,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => {
      dispatch({
        type: actions.AUTH_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.SET_AUTH_ERROR,
        payload: err.response.data.message,
      });
    });
};

export const setAuthError = (authErr) => {
  return {
    type: actions.SET_AUTH_ERROR,
    authErr: authErr,
  };
};

export const logOutUser = () => {
  return {
    type: actions.LOGOUT_USER,
  };
};
