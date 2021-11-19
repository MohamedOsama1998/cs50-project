import { actions } from "../actionConstants";

const initState = {};

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_USER_FROM_COOKIES:
      return {
        ...payload,
        isAuth: true,
      };
    case actions.AUTH_USER:
      return {
        ...payload,
        isAuth: true,
      };
    case actions.LOGOUT_USER:
      return {};
    case actions.SET_AUTH_ERROR:
      return {
        ...state,
        authErr: payload,
      };
    default:
      return state;
  }
};
