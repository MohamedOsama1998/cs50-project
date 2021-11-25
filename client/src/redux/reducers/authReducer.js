import { actions } from "../actionConstants";

const initState = { authErr: "" };

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_USER_FROM_COOKIES:
      return {
        ...state,
        ...payload,
        isAuth: true,
      };
    case actions.AUTH_USER:
      return {
        ...state,
        ...payload,
        isAuth: true,
      };
    case actions.UPDATE_USER:
      return {
        ...state,
        ...payload,
      };
    case actions.SET_AUTH_ERROR:
      return {
        ...state,
        authErr: payload,
      };
    case actions.LOGOUT_USER:
      return {};
    default:
      return state;
  }
};
