import { actions } from "../actionConstants";
import Axios from "axios";
import { getFormData } from "../../helpers";

export const fetchTasks = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "GET",
      url: "/tasks/fetch",
    })
      .then((res) => {
        dispatch({
          type: actions.FETCH_TASKS,
          payload: res.data.tasks,
        });
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addTask = (task) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "PUT",
      url: "/tasks/add",
      data: getFormData(task),
    })
      .then((res) => {
        dispatch({
          type: actions.ADD_TASK,
          payload: res.data,
        });
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteTask = (taskID) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "DELETE",
      url: "/tasks/delete",
      data: getFormData({ taskID: taskID }),
    })
      .then(() => {
        dispatch({
          type: actions.DELETE_TASK,
          payload: taskID,
        });
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateTaskStatus = (data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "PATCH",
      url: "/tasks/updatestatus",
      data: getFormData(data),
    })
      .then((res) => {
        dispatch({
          type: actions.UPDATE_TASK_STATUS,
          payload: res.data,
        });
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateTaskContents = (task) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "PATCH",
      url: "/tasks/updatecontent",
      data: getFormData(task),
    })
      .then((res) => {
        dispatch({
          type: actions.UPDATE_TASK_CONTENTS,
          payload: res.data,
        });
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
