import { actions } from "../actionConstants";

const initState = [];

export const tasksReducer = (state = initState, { type, task }) => {
  switch (type) {
    case actions.ADD_TASK:
      return [...state, task];
    default:
      return state;
  }
};
