import { actions } from "../actionConstants";
import Axios from "axios";
import { getFormData } from "../../helpers";

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
    data: getFormData(task),
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

export const deleteTask = (taskID) => (dispatch) => {
  Axios({
    method: "DELETE",
    url: "/tasks",
    data: getFormData({ taskID: taskID }),
  })
    .then(() => {
      dispatch({
        type: actions.DELETE_TASK,
        payload: taskID,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateTaskStatus = (data) => (dispatch) => {
  Axios({
    method: "PATCH",
    url: "/tasks",
    data: getFormData(data),
  }).then((res) => {
    dispatch({
      type: actions.UPDATE_TASK_STATUS,
      payload: data,
    });
  });
};
