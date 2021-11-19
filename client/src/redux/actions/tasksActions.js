import { actions } from "../actionConstants";
import Axios from "axios";

export const fetchTasks = () => (dispatch) => {
  Axios({
    method: "GET",
    url: "/tasks",
  })
    .then((res) => {
      dispatch({
        type: actions.FETCH_TASKS,
        payload: res.data.tasks,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const addTask = (task) => (dispatch) => {
  Axios({
    method: "POST",
    url: "/tasks",
    data: task,
  })
    .then((res) => {
      dispatch({
        type: actions.ADD_TASK,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const toggleAddTaskModal = (modal) => {
  return {
    type: actions.TOGGLE_ADD_TASK_MODAL,
    payload: modal,
  };
};
