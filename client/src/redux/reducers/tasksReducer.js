import { actions } from "../actionConstants";

const initState = [];

export const tasksReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.ADD_TASK:
      return [...state, payload];
    case actions.FETCH_TASKS:
      return payload;
    default:
      return state;
  }
};
