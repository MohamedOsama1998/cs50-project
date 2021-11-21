import { actions } from "../actionConstants";

const initState = [];

export const tasksReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_TASKS:
      return payload;
    case actions.ADD_TASK:
      return [...state, payload];
    case actions.DELETE_TASK:
      return state.filter((task) => task.taskID !== payload);
    case actions.UPDATE_TASK_STATUS:
      return state.map((task) =>
        task.taskID === parseInt(payload.taskID)
          ? {
              ...task,
              status: payload.status,
              modifiedOn: payload.modifiedOn,
            }
          : task
      );
    case actions.UPDATE_TASK_CONTENTS:
      return state.map((task) =>
        task.taskID === parseInt(payload.taskID) ? payload : task
      );
    default:
      return state;
  }
};
