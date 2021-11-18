import { actions } from "../actionConstants";

export const addTask = (task) => {
  return {
    type: actions.ADD_TASK,
    task: task,
  };
};
