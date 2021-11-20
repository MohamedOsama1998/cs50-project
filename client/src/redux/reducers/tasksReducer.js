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
    case actions.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.taskID !== payload),
      };
    case actions.UPDATE_TASK_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.taskID === parseInt(payload.taskID)
            ? {
                ...task,
                status: payload.status,
                modifiedOn: payload.modifiedOn,
              }
            : task
        ),
      };
    default:
      return state;
  }
};
