import { actions } from "../actionConstants";
import { getFormData } from "../../helpers";
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

export const registerUser = (payload) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "POST",
      url: "/register",
      data: getFormData(payload),
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        dispatch({
          type: actions.AUTH_USER,
          payload: res.data,
        });
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const loginUser = (payload) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "POST",
      url: "/login",
      data: getFormData(payload),
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        dispatch({
          type: actions.AUTH_USER,
          payload: res.data,
        });
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateUserInfo = (data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "PATCH",
      url: "profile/updateinfo",
      data: getFormData(data),
    })
      .then((res) => {
        dispatch({
          type: actions.UPDATE_USER,
          payload: res.data,
        });
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateUserPassword = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "PATCH",
      url: "profile/changepassword",
      data: getFormData(data),
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const checkUserPassword = (password) => () => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "POST",
      url: "/auth/check",
      data: getFormData(password),
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteUser = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "DELETE",
      url: "/auth/deleteuser",
    })
      .then(() => {
        Cookies.remove("accessToken");
        dispatch({
          type: actions.LOGOUT_USER,
        });
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const logOutUser = () => {
  Cookies.remove("accessToken");

  return {
    type: actions.LOGOUT_USER,
  };
};
