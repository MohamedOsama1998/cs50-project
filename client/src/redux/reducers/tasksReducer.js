import { actions } from "../actionConstants";

const initState = { modal: false, tasks: [] };

export const tasksReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_TASKS:
      return {
        ...state,
        tasks: payload,
      };
    case actions.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };
    case actions.TOGGLE_ADD_TASK_MODAL:
      return {
        ...state,
        modal: !payload,
      };
    default:
      return state;
  }
};
